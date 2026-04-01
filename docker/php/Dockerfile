FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip curl git libpq-dev

RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www