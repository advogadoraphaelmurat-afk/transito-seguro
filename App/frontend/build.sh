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

# ===== PÓS-BUILD: Substituir favicon no output final =====
echo "Substituindo favicon por versão transparente..."
cp ../../pitch-deck/icons/logo/logo_multi.ico ./build/web/favicon.ico
# Remover o favicon.png padrão do Flutter (fundo branco)
rm -f ./build/web/favicon.png
# Atualizar index.html no output final para usar o .ico
sed -i 's|<link rel="icon" type="image/png" href="favicon.png"/>|<link rel="icon" type="image/x-icon" href="favicon.ico"/>|g' ./build/web/index.html
# Fallback: caso o formato do link seja diferente
sed -i 's/favicon\.png/favicon.ico/g' ./build/web/index.html

echo "Build concluído com favicon transparente!"
