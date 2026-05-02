# Trânsito Seguro - Cidade Viva 🚦

O aplicativo "Trânsito Seguro: Cidade Viva" é um ecossistema educacional completo, desenhado para acompanhar estudantes do Ensino Fundamental I ao Ensino Médio, integrando diretrizes pedagógicas da BNCC e conteúdos de segurança viária.

## 🏗️ Estrutura do Projeto

O sistema foi finalizado e conta com duas camadas principais prontas para produção:

### 1. Backend (NestJS + Prisma + SQLite)
Localizado em `/backend`.
- **API Restful** para gestão de usuários, escolas e turmas.
- **Integração Pedagógica**: O sistema conta com 9 Volumes (1º ao 9º Ano), divididos em 4 bimestres com até 8 semanas de missões.
- **Sistema de Professores**: Gestão ativa onde professores controlam o desbloqueio de módulos (semanas) e acompanham notas em tempo real.
- **Gamificação (Engajamento)**:
  - **Moedas e XP**: Recompensas atreladas à performance nas tarefas.
  - **Loja (Store)**: Compra de customizações para avatares (Capacetes, Uniformes, Veículos).
  - **Desafios Diários (Daily Challenges)**: Sistema rotativo para estimular o retorno constante do aluno ao app.
  - **Conquistas (Badges)**: Medalhas automáticas ao atingir marcos de aprendizado.

### 2. Frontend (Flutter + Riverpod)
Localizado em `/frontend`.
- **Design Premium**: Interface moderna em "Dark Mode" utilizando Glassmorphism e tipografia limpa (Google Fonts).
- **Roteamento Dinâmico de Missões**: O `MissionRouter` interpreta o tipo de missão do banco e carrega telas interativas específicas:
  - **Simulações Físicas**: Cálculo de frenagem em tempo real (para Anos Finais/Médio).
  - **Simulações de Risco**: Efeito visual e atraso de controle para demonstrar embriaguez ao volante.
  - **Interações de Acessibilidade**: Identificação de barreiras e rotas seguras para cadeirantes.
- **Painéis Específicos**:
  - `HomeScreen`: Visão central do aluno, incluindo a Trilha do Conhecimento curvada e Desafio Diário.
  - `ProfileScreen / StoreScreen`: Gestão de inventário e visualização do avatar customizado.
  - `TeacherDashboardScreen`: Painel de controle do educador para liberação de conteúdo.

## 🚀 Como Executar (Para Desenvolvedores)

### Requisitos:
- **Node.js** (v18+)
- **Flutter SDK** (v3.19+)
- **Emulador** (Android/iOS) ou Chrome.

### Passos:
1. **Backend**:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   node prisma/seed_data.js # (Opcional: para popular os dados de teste)
   npm run start:dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   flutter pub get
   flutter run
   ```

## 📚 Mapeamento Didático Concluído
Todas as 32 semanas letivas para os 9 anos do projeto foram codificadas. Os documentos detalhando as tarefas específicas encontram-se na pasta raiz do material didático (Série 01 a 09), referenciados pelas IDs da base de dados do aplicativo.

---
*Projeto finalizado e pronto para transição de equipe de testes e homologação escolar.*
