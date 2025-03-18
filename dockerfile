FROM node:22.12.0

WORKDIR /app_backend

COPY package*.json ./
RUN npm install
COPY ./src ./src

EXPOSE 3000

CMD ["npm", "start"]
