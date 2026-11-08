# Planejamento trimestral — Novembro/2026 a Janeiro/2027

Apresentação em HTML (WebSlides) para o planejamento operacional das avaliações impressas e digitais da SEMED.

**Estrutura base:** 17 slides prontos para receber os dados aos poucos.

---

## Como abrir

1. Abra o arquivo `index.html` no navegador (Chrome, Edge ou Firefox).
2. Não precisa de servidor nem de instalação.
3. Para apresentar em tela cheia, pressione `F`.

### Atalhos

| Tecla | Ação |
|---|---|
| `←` `→` | Navegar entre os slides |
| `F` | Alternar tela cheia |
| `I` | Abrir/fechar o índice |
| `P` | Imprimir / exportar PDF |
| `Esc` | Fechar o índice |

Também é possível navegar por swipe em telas de toque.

---

## O que já está pronto

- 17 slides com hierarquia visual e textos-base.
- Navegação por teclado, swipe e botões.
- Barra de progresso e contador de slides.
- Índice navegável com todos os slides.
- Tema claro/escuro automático conforme o slide.
- Layout responsivo (desktop, tablet e celular).
- Estilos de impressão para exportar em PDF (A4 paisagem).
- Campos pendentes marcados com `—` e `class="fill"`.

---

## Estrutura do projeto

```
Apresentação/
├── index.html                 # os 17 slides
├── assets/
│   ├── css/
│   │   ├── webslides.css      # base WebSlides 1.5.0
│   │   └── deck.css           # tema e componentes do deck
│   ├── js/
│   │   ├── webslides.js       # motor WebSlides 1.5.0
│   │   └── deck.js            # índice, controles, progresso e atalhos
│   └── img/
│       └── favicon.svg
└── README.md
```

---

## Como inserir os dados

Cada slide é uma `<section>` dentro de `<article id="webslides">`. O comentário acima de cada seção indica o número e o que editar.

### Campos pendentes

Procure por:

- `class="fill"` — valores que serão preenchidos (ex.: métricas do trimestre anterior).
- `data-field="..."` — nome do campo, útil para localizar e substituir.
- `—` — travessão usado como placeholder visual.
- `A validar`, `A preencher`, `A definir` — pills de status.

Exemplo:

```html
<span class="metric-value fill" data-field="escolas_atendidas" title="Inserir dado">—</span>
```

Basta substituir o `—` pelo número e remover a classe `fill` (opcional).

### Índice

O índice é gerado automaticamente a partir de:

```html
<section data-title="Novembro 2026" data-section="Calendário">
```

Se mudar o nome de um slide, atualize `data-title` e `data-section`.

### Cores e identidade

Os tokens ficam no início de `assets/css/deck.css`:

```css
--brand: #6B32D9;
--teal: #0D9488;
--amber: #D97706;
--ink: #0F172A;
```

Alterar esses valores atualiza o deck inteiro.

---

## Mapa dos 17 slides

| # | Slide | O que preencher |
|---|---|---|
| 01 | Capa | Marca, período, versão e texto de apoio |
| 02 | Sumário executivo | Mensagem central e 3 prioridades |
| 03 | Contexto e objetivos | Escopo, responsabilidades e objetivos |
| 04 | Balanço do trimestre anterior | Métricas, o que funcionou e o que evoluir |
| 05 | Metas e indicadores | Metas e forma de medição |
| 06 | Calendário macro | Semanas, marcos e premissas |
| 07 | Novembro 2026 | Foco, entregas e marco do mês |
| 08 | Dezembro 2026 | Foco, entregas e marco do mês |
| 09 | Janeiro 2027 | Foco, entregas e marco do mês |
| 10 | Portfólio de avaliações | Avaliações, modelos, públicos, janelas e status |
| 11 | Operação impressa | Fluxo, prazos e regras críticas |
| 12 | Operação digital | Fluxo, prazos e regras críticas |
| 13 | Logística e suprimentos | Itens do kit e responsáveis |
| 14 | Pessoas e responsabilidades | Matriz RACI e pontos focais |
| 15 | Riscos e contingências | Riscos, severidade e ações |
| 16 | Governança e rituais | Rituais, escalonamento e canais |
| 17 | Próximos passos | Decisões, prazos e chamada final |

---

## Exportar para PDF

1. Pressione `P` ou use o botão de impressão no rodapé.
2. No destino, escolha **Salvar como PDF**.
3. Use **A4 paisagem** e ative **Gráficos de fundo**.
4. Cada slide ocupa uma página.

---

## Base e créditos

- **WebSlides 1.5.0** — Jose Luís Antúnez e contribuidores (MIT).
- **Tipografia** — Plus Jakarta Sans e Inter (Google Fonts).
- **Tokens visuais** — inspirados no design system do InnovStock (`#6B32D9`, `#0F172A`, `#F8FAFC`).
- **Conteúdo operacional** — baseado no POP INNOV (avaliações impressas e digitais).

---

## Observação

As datas de semana e as metas são uma **proposta de trabalho**. Valide o calendário, o escopo e os indicadores com a SEMED antes de congelar a versão final.
