# JavaCore Sinhalen — production image.
# Multi-stage: build the Angular app with Node, then serve the static output
# with nginx. Served at the root of demo2.eseeds.lk (base href "/").

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
# npm install (not `npm ci`): the lockfile is generated with npm 11 on macOS and
# omits some platform-optional native deps (@emnapi/*), which strict `npm ci`
# rejects on Linux. `npm install` resolves them for the build platform.
RUN npm install --no-audit --no-fund --loglevel=error
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/javacore-sinhalen/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
