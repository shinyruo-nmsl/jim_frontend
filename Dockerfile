FROM --platform=linux/amd64 node:latest

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build:pc

WORKDIR /app/packages/pc-proj

COPY packages/pc-proj ./

FROM --platform=linux/amd64 nginx:latest

RUN mkdir /app

COPY --from=0 /app/packages/pc-proj/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/ssl