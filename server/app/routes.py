def includeme(config):
    config.add_route('ajax_root', '/api/data/{entity_name}')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
