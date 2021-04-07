# Project: gensys
Playing with data storage. This is a 3 tier architecture:

- Database: Postgres
- App Server: Pyramid (Python)
- Front-end: Angular

# How to Run
The database and app server run under Docker.

First time, run this to create empty database:

    make recreatedb

Then, run database and app server by running:

    make run

You should see this:

    docker ps
    CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES
    d5707172f9cb   gensysserver   "/home/gensys/pysand…"   4 seconds ago   Up 3 seconds   0.0.0.0:6540->6540/tcp   gensysservertest
    30c912094e7d   postgres       "docker-entrypoint.s…"   4 seconds ago   Up 4 seconds   5432/tcp                 psqlserver

To run the front-end:

    cd client
    npm start

Then hit the app:

    http://localhost:4200