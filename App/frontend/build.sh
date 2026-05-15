#!/bin/bash
# Script para baixar o Flutter SDK e compilar para Web na Vercel

echo "Instalando Flutter..."
if [ ! -d "flutter" ]; then
  git clone https://github.com/flutter/flutter.git -b stable
fi
export PATH="$PATH:`pwd`/flutter/bin"

echo "Rodando pub get..."
flutter pub get

echo "Compilando Flutter Web..."
flutter config --enable-web
flutter create . --platforms web

# Substituir o favicon padrão por um transparente (SVG) do projeto
cp ../web/public/favicon.svg ./web/favicon.svg
# Atualizar o index.html para apontar para o SVG
sed -i 's/favicon.png/favicon.svg/g' ./web/index.html
sed -i 's/image\/png/image\/svg+xml/g' ./web/index.html

if [ -z "$API_URL" ]; then
  flutter build web --release
else
  flutter build web --release --dart-define=API_URL=$API_URL
fi

# O resultado ficará na pasta build/web
