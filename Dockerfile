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

RUN mkdir /app-pc
COPY --from=0 /app/packages/pc-proj/dist /app-pc

RUN mkdir /app-h5
COPY --from=0 /app/packages/h5-proj/dist /app-h5


COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/ssl