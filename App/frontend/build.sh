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

# Substituir o favicon padrão por um transparente (.ico) da pasta pitch-deck
cp ../../pitch-deck/icons/logo/logo_multi.ico ./web/favicon.ico
# Atualizar o index.html para apontar para o .ico
sed -i 's/favicon.png/favicon.ico/g' ./web/index.html
sed -i 's/image\/png/image\/x-icon/g' ./web/index.html

if [ -z "$API_URL" ]; then
  flutter build web --release
else
  flutter build web --release --dart-define=API_URL=$API_URL
fi

# O resultado ficará na pasta build/web
