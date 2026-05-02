# Trânsito Seguro — Plano de Implementação

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Produzir um material didático completo de educação para o trânsito (9 volumes para alunos + 1 guia do professor), fundamentado no BNCC, CTB e legislação urbanística, com foco inovador no Estado do Rio de Janeiro.

**Architecture:** O projeto é dividido em 3 Ciclos Pedagógicos (Interdisciplinar, Autoral e Ensino Médio). Cada volume segue uma progressão cognitiva e jurídica, culminando em um Plano de Ação Cidadã.

**Tech Stack:** Markdown (conteúdo), Gemini 3 Flash/Pro (geração), Ferramentas de Imagem (ilustrações), BNCC e CTB (referências normativas).

---

### Status Atual
- [x] Volume 1 — 4º Ano (Fase Piloto Concluída)
- [x] Volume 2 — 5º Ano (Fase Piloto Concluída)
- [ ] Auditoria de Densidade dos Volumes 1 e 2
- [ ] Ciclo 1 — Volume 3 (6º Ano)
- [ ] Ciclo 2 — Volumes 4, 5 e 6
- [ ] Ciclo 3 — Volumes 7, 8 e 9
- [ ] Volume 10 — Guia do Professor

---

### Task 1: Auditoria e Ajuste dos Volumes Concluídos
**Files:**
- Modify: `volume1_4ano.md`
- Modify: `volume2_5ano.md`
- Check: `task.md`

**Step 1: Verificar densidade pedagógica**
Garantir que os volumes 1 e 2 possuem a densidade de 20-30 páginas equivalente (aproximadamente 5.000 a 8.000 palavras por volume) e referências explícitas ao CTB/BNCC.

**Step 2: Validar ilustrações**
Verificar se as capas e ilustrações internas estão integradas ao texto conforme o prompt mestre.

---

### Task 2: Ciclo 1 — Volume 3 (6º Ano)
**Files:**
- Create: `volume3_6ano.md`

**Step 1: Elaborar Ficha Técnica e Apresentação**
Definir objetivos BNCC para o 6º ano e texto de boas-vindas analítico.

**Step 2: Gerar Bimestres 1 e 2**
Foco: Estatísticas reais e a "epidemia" das motos no Brasil/RJ.

**Step 3: Gerar Bimestres 3 e 4**
Foco: Direito ao espaço urbano e o "Tribunal do Trânsito" (Simulação).

---

### Task 3: Ciclo 2 — Ciclo Autoral (Volumes 4, 5 e 6)
**Files:**
- Create: `volume4_7ano.md`
- Create: `volume5_8ano.md`
- Create: `volume6_9ano.md`

**Step 1: Volume 4 (7º Ano) — Protagonismo**
Temas: Velocidade, Lei Seca e Projeto "Eu sou a mudança".

**Step 2: Volume 5 (8º Ano) — Análise Sistêmica**
Temas: Custos dos acidentes (R$ 24 bi), Tecnologia e Micromobilidade.

**Step 3: Volume 6 (9º Ano) — Ponte para o Ensino Médio**
Temas: Estatuto da Cidade, Vision Zero e Diálogos Difíceis.

---

### Task 4: Ciclo 3 — Ensino Médio (Volumes 7, 8 e 9)
**Files:**
- Create: `volume7_1serie.md`
- Create: `volume8_2serie.md`
- Create: `volume9_3serie.md`

**Step 1: Volume 7 — Direito à Vida e Participação**
Aprofundamento no Art. 5º da CF e processo legislativo.

**Step 2: Volume 8 — Constituição e Mobilidade**
Foco em Saúde Pública (Art. 196) e Meio Ambiente (Art. 225).

**Step 3: Volume 9 — Ativismo e Plano de Ação Cidadã**
Desenvolvimento do projeto final de intervenção real na comunidade.

---

### Task 5: Volume 10 — Guia do Professor
**Files:**
- Create: `volume10_guia_professor.md`

**Step 1: Fundamentação Teórica**
Incluir referências a Ausubel, Bandura e Kilpatrick conforme solicitado.

**Step 2: Orientações por Volume**
Gabaritos comentados e estratégias de inclusão (TEA, deficiências).

---

### Task 6: Consolidação e Revisão Final
**Files:**
- Modify: `README.md`
- Update: `task.md`

**Step 1: Revisão de links e referências**
Garantir que todas as menções ao CTB e CF estão corretas em todos os 10 volumes.

**Step 2: Geração de Sumário Geral**
Criar um índice unificado para a coleção completa.
