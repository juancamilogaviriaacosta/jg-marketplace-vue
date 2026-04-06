# build frontend
FROM node:22 AS frontend
WORKDIR /app
COPY jg-marketplace-fe .
RUN npm install && npm run build

# build backend
FROM gradle:8.5-jdk21
WORKDIR /app

COPY jg-marketplace-spring .

# copiar build de vue
COPY --from=frontend /app/dist /app/src/main/resources/static

RUN ./gradlew build -x test && cp build/libs/*.jar app.jar

CMD ["java", "-jar", "app.jar"]