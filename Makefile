
help:
	@echo "Available commands:"
	@sed -n '/^[a-zA-Z0-9_.]*:/s/:.*//p' <Makefile | sort
	@echo "Start server with: m run"
	@echo "Then: m bash"
	@echo "Then: ./run.sh"

.PHONY: client
client:
	cd client && npm start

# We run docker build inside subdirectory to avoid including too many files from app.
# Therefore, we have to individually copy files needed by docker build.
# The whole app is shared as a link, so this is for other things.
build:
	cp server/requirements.txt server/env/common/envvars_docker server/development.ini server/dock/
	cd server/dock && docker build -t gensysserver -f Dockerfile .
	rm server/dock/requirements.txt server/dock/envvars_docker server/dock/development.ini

stop:
	#-docker ps -a -q | xargs docker rm -f
	docker ps -a -q  --filter ancestor=postgres | xargs docker rm -f
	docker ps -a -q  --filter ancestor=gensysserver | xargs docker rm -f

rundb:
	docker run -d --name psqlserver -v postgres_data:/var/lib/postgresql/data/ -e POSTGRES_PASSWORD=Password1 postgres

wait:
	@echo Race condition -- waiting a few seconds...
	sleep 5

run: stop build
	@echo "--- Starting containers ---"
	docker run -d --name psqlserver -v postgres_data:/var/lib/postgresql/data/ -e POSTGRES_PASSWORD=Password1 postgres
	docker run -d --name gensysservertest -v `pwd`/server:/home/gensys/app -p 6540:6540 --link=psqlserver:psqlserver gensysserver /home/gensys/pysandbox/bin/pserve --reload development.ini
	@echo "--- Running containers ---"
	@docker ps
	@echo
	#@echo Now go to: http://`docker-machine ip default`:6540
	@echo Now go to: http://0.0.0.0:6540
	#docker logs -f gensysservertest

deletevol:
	-docker volume rm postgres_data

importdb:
	docker exec -i psqlserver psql -h localhost -U postgres --dbname=postgres < db/gensys.ddl

recreatedb: stop deletevol rundb wait importdb

sql:
	docker exec -i psqlserver psql -h localhost -U postgres --dbname=postgres

pgdump:
	docker exec -i psqlserver pg_dump -h localhost -U postgres --dbname=postgres

# To debug, run this, then run inside it: pserve development.ini --reload
bash:
	docker stop ` docker ps -a -q  --filter ancestor=gensysserver `
	docker run -it --rm -v `pwd`/server:/home/gensys/app -p 6540:6540 --link=psqlserver:psqlserver gensysserver /bin/bash
