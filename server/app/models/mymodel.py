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


class entity(Base):
    __tablename__ = 'entity'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer)
    type = Column(Text)
    name = Column(Text)
    fields = Column(JSONB)
    last_updated_by   = Column(Integer)
    last_updated_date = Column(DateTime)

