FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
COPY src/config/config.prod.yaml ./config.prod.yaml
EXPOSE 8082
CMD ["npm", "start"]