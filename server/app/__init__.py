from pyramid.config import Configurator
import os


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    DATABASE_URL = 'postgresql+psycopg2://{user}:{password}@{host}:{port}'.format(
        user='postgres',
        password=os.environ['PSQLSERVER_ENV_POSTGRES_PASSWORD'],
        host=os.environ['PSQLSERVER_PORT_5432_TCP_ADDR'],
        port=os.environ['PSQLSERVER_PORT_5432_TCP_PORT'],  # looks like: =tcp://172.17.0.2:5432',
    )

    settings['sqlalchemy.url'] = DATABASE_URL
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')
    config.scan()
    return config.make_wsgi_app()
