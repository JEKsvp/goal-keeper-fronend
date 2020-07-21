FROM node:current-alpine3.12
WORKDIR /usr/src/app
COPY ./server ./
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "start"]