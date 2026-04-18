# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .
RUN bun run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
