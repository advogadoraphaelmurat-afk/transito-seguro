# TAREFA DE IA: Injeção de Prompts de Ilustração (Volumes 02 ao 09)

**Objetivo:** Ler os arquivos Markdown de material didático (Volume 02 ao 09) e injetar descrições detalhadas para ilustradores terceirizados, no exato formato usado no Volume 01.

**Nível de Complexidade:** Baixa (Tarefas de rotulagem e geração de texto descritivo simples).
**Instruções para o Modelo de IA:**

1. **Contexto:** Este é um projeto de Educação para o Trânsito no RJ. As imagens devem refletir o "Realismo Carioca" (cenários reais, pessoas diversas, ruas do Brasil).
2. **O que fazer:** Abra os arquivos da pasta `/DS/` um a um (ex: `Volume 02.md`).
3. **Padrão de Injeção:** Identifique os textos de abertura de semestre ou conceitos chave. Insira ANTES do parágrafo um bloco de citação Markdown EXATAMENTE como este formato:

```markdown
> 🖼️ **[ESPAÇO PARA ILUSTRAÇÃO: V2_B1_AB]**
> **Prompt:** [Descreva a cena visualmente com base no parágrafo abaixo. Ex: Crianças de 11 anos observando um cruzamento movimentado perto do Maracanã]
> **Estilo:** [Narrativo / Infográfico / Close-up / Fotorealista]
```

4. **Quantidade Esperada:**
   - Cerca de 12 a 16 imagens para os Volumes 02 e 03.
   - Cerca de 12 imagens para os Volumes 04, 05 e 06.
   - Cerca de 8 imagens para os Volumes 07, 08 e 09.

5. **Regra Crítica:** Não modifique o texto didático original, apenas ADICIONE os blocos de prompt.
