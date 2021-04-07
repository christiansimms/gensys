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

