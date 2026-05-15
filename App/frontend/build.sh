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
echo "Substituindo favicon por versão com fundo transparente..."
# Sobrescrever o favicon.png padrão (fundo branco) com o nosso (fundo transparente)
cp assets/images/favicon.png ./build/web/favicon.png

echo "Build concluído!"
