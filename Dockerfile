FROM node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]

EXPOSE 3000

