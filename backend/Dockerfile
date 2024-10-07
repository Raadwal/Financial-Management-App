FROM maven:3.9.3-amazoncorretto-17 AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /target/financial_management-0.0.1-SNAPSHOT.jar financial_management.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","financial_management.jar"]