FROM --platform=linux/amd64 node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/packages/pc-proj

COPY packages/pc-proj ./

RUN npm install

RUN npm run build

FROM --platform=linux/amd64 nginx:latest

RUN mkdir /app

COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf