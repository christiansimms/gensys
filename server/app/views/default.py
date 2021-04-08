from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError
from ..models import mymodel

from ..models import MyModel


@view_config(route_name='ajax_root', renderer='json')
def ajax_root(request):
    # Get param.
    entity_name = request.matchdict['entity_name']

    method = request.method
    if method == 'GET':
        # Generic handling.
        entity_cl = getattr(mymodel, entity_name)
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
        # Maybe load child objects. TEMP
        # if entity_name == 'module':
            # Load nodes.
            # obj.nodes = request.dbsession.query(node).filter_by(module_id=entity_id).all()
        pass
    elif method == 'POST':
        obj.update_fields(request)
    elif method == 'DELETE':
        request.dbsession.delete(obj)
    else:
        raise Exception('Unknown method: {}'.format(method))

    return obj

