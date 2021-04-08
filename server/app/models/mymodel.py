from datetime import datetime
from datetime import date
from decimal import Decimal

from sqlalchemy import (
    Column,
    DateTime,
    Index,
    Integer,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB

from .meta import Base


# TODO: delete
class MyModel(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)
Index('my_index', MyModel.name, unique=True, mysql_length=255)


def make_value_json_compatible(val):
    typ = type(val)
    # log.debug('makeValueJsonCompatible: %s: %s' % (typ, val))
    if typ is datetime:
        return val.strftime('%Y-%m-%dT%H:%M:%S')
    elif typ is date:
        return val.strftime('%Y-%m-%d')
        # return val.strftime('%Y-%m-%dT00:00:00')
    elif typ is Decimal:
        return str(val)
    elif typ is bytes:
        # not easy to json-serialize BLOB, and what's the point, it cannot be used on client side directly
        return '(BLOB)'
    else:
        return val


def get_param(request, name, default_value=None):
    """ Return required request param, or default_value if not found. """

    if request.body:
        if default_value is None:
            # This is required.
            if request.POST:
                # Must be a form POST.
                return request.POST[name]
            else:
                # Assume it's JSON in body of request, and it's required.
                return request.json_body[name]
        else:
            # This is optional.
            if request.POST:
                # Must be a form POST.
                return request.POST.get(name, default_value)
            else:
                # Assume it's JSON in body of request, and it's required.
                return request.json_body.get(name, default_value)
    else:
        # Assume it's uri-encoded.
        return request.params.get(name, default_value)

class CustomBase(Base):
    __abstract__ = True

    def __json__(self, _):
        """ Allow serializing as json when sending web responses in pyramid. """

        # Serialize all columns, plus any extra attributes that have been added.
        # We cannot use self.__table__.columns because that only includes sqlalchemy mapped columns
        # -- and sometimes we add extra attributes to objects before sending thru json.
        d = {name: make_value_json_compatible(value)
             for name, value
             in self.__dict__.items()
             if not name.startswith('_')
             }
        d['_type'] = self.__class__.__name__.lower()
        return d

    @classmethod
    def get_user_editable_fields(cls):
        """ Return list of editable fields.
        """
        out = []
        for name, field in cls.__table__.columns.items():
            if name in ('id', 'deleted', 'last_updated_by', 'last_updated_date'):
                pass
            else:
                out.append(field)
        return out

    def update_fields(self, request, fields_to_change=None):
        """ Generically update all editable fields in object.
            If fields_to_change is specified then only update those else update all.
        """
        for field in self.get_user_editable_fields():

            # Get name and type of field.
            name = field.name
            typ = field.type.__class__.__name__

            # Skip field if requested.
            if fields_to_change and name not in fields_to_change:
                continue

            # Below, make all fields be optional, if clear out a text field then we don't receive any parameter.
            # Have to use '' instead of None, b/c None means it's required.
            val = get_param(request, name, '')

            if val:   # 2021-04-07: ignore: True:  # val:  2016-11-03  this if statement messes up if 0 is passed as an integer
                # The if-stmt below is in same order as genmodel's getPythonColumnDecl.
                if typ == 'Text':
                    if name == 'file_system':  # TODO: ugly, this is a json parameter
                        value = dumps(val)
                    else:
                        value = val
                elif typ in ('Integer', 'Numeric'):
                    value = int(val)  # crs: sqlite doesn't support: Decimal(val)
                elif typ == 'BLOB':
                    # Don't save BLOBs.
                    continue
                elif typ == 'CLOB':
                    value = val
                elif typ == 'JSONB':
                    value = val
                else:
                    raise Exception('updateFields found unknown field type: %s' % typ)
            else:
                value = None

            setattr(self, name, value)

        return self



class entity(CustomBase):
    __tablename__ = 'entity'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer)
    type = Column(Text)
    name = Column(Text)
    fields = Column(JSONB)
    last_updated_by   = Column(Integer)
    last_updated_date = Column(DateTime)

