FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod 0700 /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "npm", "start" ]
