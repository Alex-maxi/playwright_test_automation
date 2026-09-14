
FROM mcr.microsoft.com/playwright:v1.57.0-noble
RUN npm install -g wait-on

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci

# Копіюємо весь проект
COPY . .

CMD ["sh", "-c", "npx wait-on ${BASE_URL_API_DEV:-http://localhost:3000} --timeout 60000 && npm run test:all"]

