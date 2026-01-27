# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
# Set app version
ARG VITE_APP_VERSION=dev
ENV VITE_APP_VERSION=$VITE_APP_VERSION
# Install deps first
COPY package*.json ./
RUN npm ci
# Copy source and build
COPY . .
RUN npm run build
# ---------- Runtime stage ----------
FROM nginx:alpine
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*
# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html
# SPA routing support (React Router) + optional cache headers
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
