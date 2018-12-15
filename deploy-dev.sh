#!/bin/bash
curl https://raw.githubusercontent.com/linkedpipes/applications/master/docker-compose.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/linkedpipes/applications/master/nginx.conf -o nginx.conf
docker-compose down || true
docker rm $(docker ps -a -q -f name=lpa-*) || true
docker-compose pull
docker-compose up