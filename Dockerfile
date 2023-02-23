FROM node:alpine
WORKDIR /usr/feriapp
COPY package.json /usr/feriapp/
COPY package-lock.json /usr/feriapp/
RUN npm ci\
  && npm install typescript -g
COPY . .
RUN tsc
CMD ["npm", "start"]