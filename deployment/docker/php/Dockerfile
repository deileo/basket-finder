FROM composer:1.7.3 AS composer
FROM bitnami/php-fpm:7.2

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY /entrypoint.sh /entrypoint.sh
COPY /init.sh /init.sh

RUN apt-get -qq update && apt-get -qq install -y --no-install-recommends unzip > /dev/null && apt-get clean && \
chmod +x /entrypoint.sh

CMD ["php-fpm", "-F", "--pid" , "/opt/bitnami/php/tmp/php-fpm.pid", "-c", "/opt/bitnami/php/conf/php-fpm.conf"]

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 9000
