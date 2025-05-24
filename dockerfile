FROM node:22 AS builder

WORKDIR /app_backend

COPY package*.json ./
RUN npm install

COPY . .

FROM node:22

WORKDIR /app_backend

COPY --from=builder /app_backend ./

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
