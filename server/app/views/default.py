from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import select

from sqlalchemy.exc import DBAPIError
from ..models import mymodel

from ..models import MyModel


@view_config(route_name='ajax_root', renderer='json')
def ajax_root(request):
    # Get param.
    entity_name = request.matchdict['entity_name']

    method = request.method
    if method == 'GET':
        # Get ready to do query.
        entity_cl = getattr(mymodel, entity_name)
        _select = request.params.get('_select', '')
        if _select:
            colNames = _select.split(',')
            cols = [getattr(entity_cl, colName) for colName in colNames]
            s = select(*cols)
            objs = [dict(zip(colNames, row)) for row in request.dbsession.execute(s)]  # get rid of iterator
        else:
            # Generic handling.
            q = request.dbsession.query(entity_cl)

            # Add any filters.
            for (name, value) in request.params.items():
                clattr = getattr(entity_cl, name)
                q = q.filter(clattr == value)

            objs = q.all()

        return objs
    elif method == 'POST':
        # Generically create entity.
        cl = getattr(mymodel, entity_name)
        obj = cl()
        obj.update_fields(request)
        request.dbsession.add(obj)
        request.dbsession.flush()  # get new pk
        return obj
    else:
        raise Exception('Bad method: {}'.format(method))

@view_config(route_name='ajax_item', renderer='json')
def ajax_item(request):
    # Get params.
    entity_name = request.matchdict['entity_name']
    entity_id = request.matchdict['entity_id']

    # Default way.
    entity_cl = getattr(mymodel, entity_name)
    obj = request.dbsession.query(entity_cl).filter_by(id=entity_id).one()

    method = request.method
    if method == 'GET':
        # Maybe load children.
        includeChildren = request.params.get('includeChildren', '')
        if includeChildren:
            obj.children = request.dbsession.query(entity_cl).filter_by(parent_id=entity_id).all()

        # Maybe load parent.
        includeParent = request.params.get('includeParent', '')
        if includeParent and obj.parent_id:
            obj.parent = request.dbsession.query(entity_cl).filter_by(id=obj.parent_id).one()

    elif method == 'POST':
        obj.update_fields(request)

    elif method == 'DELETE':
        request.dbsession.delete(obj)

    else:
        raise Exception('Unknown method: {}'.format(method))

    return obj

