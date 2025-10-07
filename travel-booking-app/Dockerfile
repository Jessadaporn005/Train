## ---------- Base builder stage ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build

## ---------- Runtime stage ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    USE_DB=false
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=base /app/dist ./dist
COPY public ./public
EXPOSE 3000
CMD ["node", "dist/server.js"]

# To enable DB later set USE_DB=true and add connection envs