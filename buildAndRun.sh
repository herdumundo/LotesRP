#!/bin/sh
mvn clean package && docker build -t com.hernanV/LotesRP .
docker rm -f LotesRP || true && docker run -d -p 9080:9080 -p 9443:9443 --name LotesRP com.hernanV/LotesRP