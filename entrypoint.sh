#!/bin/bash

echo "🔁 Esperando a la base de datos..."

until nc -z database 5432; do
  sleep 1
done

echo "✅ Base de datos disponible. Iniciando backend..."

npm run dev
