FROM node:14.2.0

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm i -g npm@latest \
  && npm i

COPY ./ /app/

EXPOSE 4000

CMD ["/app/docker-entrypoint.sh"]