FROM --platform=linux/amd64 node:latest

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build:pc

WORKDIR /app/packages/pc-proj

COPY packages/pc-proj ./

WORKDIR /app

RUN npm run build:h5

WORKDIR /app/packages/h5-proj

COPY packages/h5-proj ./

FROM --platform=linux/amd64 nginx:latest

WORKDIR  /pc
COPY /app/packages/pc-proj/dist ./

WORKDIR  /h5
COPY /app/packages/h5-proj/dist ./


COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/ssl