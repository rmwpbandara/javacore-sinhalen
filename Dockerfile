# JavaCore Sinhalen — production image.
# Multi-stage: build the Angular app with Node, then serve the static output
# with nginx. Served at the root of demo2.eseeds.lk (base href "/").

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/javacore-sinhalen/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
