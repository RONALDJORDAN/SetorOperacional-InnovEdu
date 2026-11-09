# Planejamento trimestral — Novembro/2026 a Janeiro/2027

Apresentação em HTML (WebSlides) para o planejamento operacional das avaliações impressas e digitais.

**Estrutura base:** 24 slides prontos para receber os dados aos poucos.

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

- 24 slides com hierarquia visual e textos-base.
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
├── index.html                 # os 24 slides
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
--brand: #6B25D6;      /* roxo elétrico */
--brand-2: #6428D4;
--lilac: #A755F7;      /* lilás */
--magenta: #FF3B9E;    /* magenta */
--coral-brand: #F87185; /* coral */
--ink: #0F172A;
```

Alterar esses valores atualiza o deck inteiro. A tipografia usa **Poppins** nos títulos e **Inter** no corpo, carregadas via Google Fonts no `index.html`.

---

## Mapa dos 24 slides

| # | Slide | O que preencher |
|---|---|---|
| 01 | Capa | Marca, período, versão e texto de apoio |
| 02 | Sumário da apresentação | Mensagem central e 3 prioridades |
| 03 | Sumário detalhado | Todas as categorias da apresentação |
| 04 | Setor Operacional · Definição | Definição, escopo e participantes da frente |
| 05 | Preparação & logística | Pilar 01 — Materiais didáticos e avaliações impressas |
| 06 | Tablets | Pilar 02 — Gestão, provisionamento e homologação |
| 07 | TACE — Tablet Auditor & Configurator | Ferramenta própria para automação de configuração de tablets |
| 08 | Laboratórios móveis | Pilar 03 — Hardware, infraestrutura, entrega e suporte |
| 09 | Suporte tecnológico | Pilar 04 — Intervenções de sistema e desenvolvimento |
| 10 | Atendimento municipal | Pilar 05 — Chamados, relacionamento e BI |
| 11 | Módulo 2 · POP (divisor) | Título, autor e 4 cards dos procedimentos |
| 12 | POP · 1.1 Triagem + 1.2 Encaminhamento | Recebimento, validação, prazos, gráfica, separação |
| 13 | POP · 971.3 Etiquetagem + 1.4 Kits + 1.5 Empacotamento | Etiquetas, kits, contingência, lacração |
| 14 | POP · 2.1 Validação Digital + 2.2 Documentação | Conferência localidade, insumos digitais, planejamento |
| 15 | POP · 2.3 Configuração + 2.4 Reserva | Provisionamento, auditoria, carga, redimensionamento |
| 16 | POP · Protocolo Preparação Geral | Pessoal, rádios, Starlink, checklist final |
| 17 | POP · 4.1 Pré-Aplicação + 4.2 Conduta | Auditoria saída, pontualidade, custódia, rondas |
| 18 | POP · 4.3 Encerramento e Sincronização | Recolhimento, upload, comunicação INNOV, inventário |
| 19 | Módulo 3 · Planejamento Trimestral (divisor) | Visão geral do trimestre e 3 cards dos meses |
| 20 | Novembro 2026 | Calendário em grade com eventos por dia |
| 21 | Dezembro 2026 | Calendário em grade com eventos por dia |
| 22 | Janeiro 2027 | Calendário em grade com eventos por dia |
| 23 | Resumo operacional por mês | Síntese de entregas e responsáveis por mês |
| 24 | Encerramento | Próximos passos e chamada final |

---

## Exportar para PDF

1. Pressione `P` ou use o botão de impressão no rodapé.
2. No destino, escolha **Salvar como PDF**.
3. Use **A4 paisagem** e ative **Gráficos de fundo**.
4. Cada slide ocupa uma página.

---

## Base e créditos

- **WebSlides 1.5.0** — Jose Luís Antúnez e contribuidores (MIT).
- **Tipografia** — Poppins e Inter (Google Fonts).
- **Tokens visuais** — paleta da identidade InnovEdu (`#6B25D6`, `#FF3B9E`, `#F87185`, `#A755F7`, `#FFFFFF`).
- **Conteúdo operacional** — baseado no POP InnovEdu (avaliações impressas e digitais).

---

## Observação

As datas de semana e as metas são uma **proposta de trabalho**. Valide o calendário, o escopo e os indicadores com a rede antes de congelar a versão final.
