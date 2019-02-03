#!/bin/bash

echo "[info] Running composer"
composer install --optimize-autoloader --no-interaction

echo "[info] Clear cache"
rm -rf api/var/cache/*

echo "[info] Cache warmup"
php bin/console cache:warmup --no-interaction

echo "[info] Waiting for mysql"
sleep 10

echo "[info] Migrate database"
php bin/console doctrine:migrations:migrate --no-interaction