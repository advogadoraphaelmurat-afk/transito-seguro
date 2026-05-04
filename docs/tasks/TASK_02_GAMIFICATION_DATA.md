# TAREFA DE IA: Geração de Dados para Banco de Dados (Gamificação)

**Objetivo:** Criar arquivos JSON válidos contendo desafios diários, itens da loja virtual e quizzes sobre educação no trânsito para popular o banco de dados via Prisma.

**Nível de Complexidade:** Baixa (Geração de dados em massa baseada em regras estritas).
**Instruções para o Modelo de IA:**

1. **Contexto:** Você é um roteirista de um aplicativo de gamificação de Trânsito para alunos (9 a 17 anos). O app possui uma "Loja", "Desafios Diários" e "Quizzes".
2. **O que fazer:** Gere arquivos JSON puros para serem usados em scripts de `seed` no Node.js.

### TAREFA A: 50 Desafios Diários
Gere um array JSON com 50 desafios diários simples.
**Formato Esperado:**
```json
[
  { "title": "Caminhada Segura", "description": "Hoje, observe e anote se os carros respeitaram a faixa perto da sua casa.", "xpReward": 50 },
  { "title": "Detetive de Placas", "description": "Identifique 3 placas de trânsito diferentes no seu trajeto.", "xpReward": 80 }
]
```

### TAREFA B: 30 Itens da Loja Virtual (Avatares)
Gere itens de customização para o aplicativo.
**Formato Esperado:**
```json
[
  { "name": "Capacete Cibernético", "category": "helmet", "priceCoins": 300, "rarity": "Epic" },
  { "name": "Skate Voador", "category": "vehicle", "priceCoins": 1500, "rarity": "Legendary" },
  { "name": "Colete Refletivo", "category": "clothing", "priceCoins": 100, "rarity": "Common" }
]
```

### TAREFA C: 40 Perguntas de Quiz Rápido (CTB e Cidadania)
Gere perguntas de múltipla escolha.
**Formato Esperado:**
```json
[
  { 
    "question": "Qual é a cor do semáforo que indica atenção, pois ele vai fechar?", 
    "options": ["Verde", "Azul", "Amarelo", "Vermelho"], 
    "correctIndex": 2,
    "explanation": "O amarelo avisa que o sinal vermelho está prestes a acender."
  }
]
```

**Regras:** 
- Retorne apenas os blocos de código JSON válidos.
- Nenhuma das respostas de trânsito pode violar o Código de Trânsito Brasileiro.
