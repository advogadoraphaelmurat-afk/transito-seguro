#!/bin/bash
# Script para baixar o Flutter SDK e compilar para Web na Vercel

echo "Instalando Flutter..."
if [ ! -d "flutter" ]; then
  git clone https://github.com/flutter/flutter.git -b stable
fi
export PATH="$PATH:`pwd`/flutter/bin"

echo "Rodando pub get..."
flutter pub get

echo "Configurando Flutter Web..."
flutter config --enable-web
flutter create . --platforms web

echo "Compilando Flutter Web..."
if [ -z "$API_URL" ]; then
  flutter build web --release
else
  flutter build web --release --dart-define=API_URL=$API_URL
fi

# ===== PÓS-BUILD: Substituir favicon =====
echo "Substituindo favicon..."
# Copiar o .ico transparente real para o output
cp assets/favicon.ico ./build/web/favicon.ico
# Atualizar referência no index.html final
sed -i 's|<link rel="icon" type="image/png" href="favicon.png"/>|<link rel="icon" type="image/x-icon" href="favicon.ico"/>|g' ./build/web/index.html
# Remover o favicon.png branco do Flutter
rm -f ./build/web/favicon.png

echo "Build concluído!"
