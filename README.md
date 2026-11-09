# InnovEdu — Setor Operacional

**Planejamento de Processos Operacionais — POP**

[![Setor: Operacional](https://img.shields.io/badge/setor-operacional-blue.svg)](https://github.com)
[![Ferramenta base: WebSlides 1.5.0](https://img.shields.io/badge/WebSlides-1.5.0-purple.svg)](https://webslides.tv/)
[![Licença: MIT](https://img.shields.io/badge/licença-MIT-green.svg)](LICENSE)
[![Status: ativo](https://img.shields.io/badge/status-ativo-green.svg)](https://github.com)

---

## 📋 Identificação

| Campo | Valor |
|-------|-------|
| **Organização** | InnovEdu |
| **Setor** | Operacional |
| **Documento** | Planejamento de Processos Operacionais (POP) |
| **Ferramenta base** | WebSlides 1.5.0 (HTML/CSS/JS, licença MIT) |
| **Apresentação** | Setor Operacional - POP - Apresentação - 2026-11-09 |
| **Ciclo de referência** | Novembro/2026 a Janeiro/2027 |
| **Escopo** | Avaliações impressas e digitais — redes municipais de ensino |

---

## 🗂️ Organização por pastas

Cada apresentação da InnovEdu fica em sua própria pasta, nomeada com o padrão:

```
Setor Operacional - POP - Apresentação - AAAA-MM-DD
```

Isso permite manter versões históricas por ciclo/trimestre sem sobrescrever entregas anteriores. O repositório concentra várias pastas como esta, uma por ciclo de apresentação.

### Conteúdo de cada pasta de apresentação

| Arquivo/Pasta | Função |
|---------------|--------|
| `index.html` | Apresentação HTML com todos os slides |
| `README.md` | Documentação desta apresentação |
| `assets/` | CSS, JS e imagens da apresentação |

---

## 🎯 Sobre o planejamento

Este documento concentra o **planejamento operacional anual** do Setor Operacional da InnovEdu, voltado à execução de avaliações impressas e digitais nas redes municipais de ensino.

A entrega principal é uma apresentação HTML autônoma (WebSlides 1.5.0), organizada em módulos que cobrem desde a definição do setor até o encerramento do ciclo, passando por logística, dispositivos, laboratórios móveis, suporte tecnológico, atendimento municipal e POPs (Procedimentos Operacionais Padrão).

Não há dependências de servidor, build ou instalação: basta abrir o `index.html` no navegador.

---

## 📅 Planejamento anual — Visão geral

O planejamento é estruturado em ciclos trimestrais, sendo o presente documento o ciclo de **Novembro/2026 a Janeiro/2027**.

### Ciclos do ano

| Ciclo | Período | Foco principal |
|-------|---------|----------------|
| Ciclo 1 | Jan – Mar/2026 | Preparação de início de ano letivo |
| Ciclo 2 | Abr – Jun/2026 | Aplicações intermediárias e suporte |
| Ciclo 3 | Jul – Set/2026 | Revisão, manutenção e preparação de fim de ano |
| **Ciclo 4 (este documento)** | **Nov/2026 – Jan/2027** | **Avaliações impressas e digitais — fim de ano e início de novo ciclo** |

### Módulos da apresentação (24 slides)

| # | Slide | Conteúdo |
|---|-------|----------|
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
| 14 | POP · 2.1 Validação Digital + 2.2 Documentação | Conferência de localidade, insumos digitais, planejamento |
| 15 | POP · 2.3 Configuração + 2.4 Reserva | Provisionamento, auditoria, carga, redimensionamento |
| 16 | POP · Protocolo Preparação Geral | Pessoal, rádios, Starlink, checklist final |
| 17 | POP · 4.1 Pré-Aplicação + 4.2 Conduta | Auditoria de saída, pontualidade, custódia, rondas |
| 18 | POP · 4.3 Encerramento e Sincronização | Recolhimento, upload, comunicação INNOV, inventário |
| 19 | Módulo 3 · Planejamento Trimestral (divisor) | Visão geral do trimestre e 3 cards dos meses |
| 20 | Novembro 2026 | Calendário em grade com eventos por dia |
| 21 | Dezembro 2026 | Calendário em grade com eventos por dia |
| 22 | Janeiro 2027 | Calendário em grade com eventos por dia |
| 23 | Resumo operacional por mês | Síntese de entregas e responsáveis por mês |
| 24 | Encerramento | Próximos passos e chamada final |

---

## 🏗️ Estrutura do repositório

O repositório `processos-operacionais` concentra várias pastas de apresentação, uma por ciclo:

```
processos-operacionais/
├── Setor Operacional - POP - Apresentação - 2026-11-09/   # esta apresentação (ciclo 4)
│   ├── index.html                 # Apresentação com os 24 slides
│   ├── README.md                  # Este arquivo
│   └── assets/
│       ├── css/
│       │   ├── webslides.css      # Base WebSlides 1.5.0
│       │   └── deck.css           # Tema, componentes e tokens visuais
│       ├── js/
│       │   ├── webslides.js       # Motor WebSlides 1.5.0
│       │   └── deck.js            # Índice, controles, progresso e atalhos
│       └── img/
│           └── favicon.svg
├── base/
│   ├── o que o operacional faz.md   # Definição executiva do Setor Operacional
│   └── webslides-latest/            # Fonte original do WebSlides (não modificar)
└── outros arquivos de suporte...
```

---

## 🛠️ Ferramenta base — WebSlides 1.5.0

O motor dessa apresentação é o **WebSlides 1.5.0**, uma biblioteca open source (licença MIT) para criar apresentações, landings e longforms em HTML.

### Características

- Funciona direto no navegador, sem servidor nem build
- Navegação por teclado, swipe e botões na tela
- Índice automático, contador de slides e barra de progresso
- Suporte a tela cheia (`F`) e exportação para PDF (`P`)
- Estilização via CSS com tokens centralizados em `assets/css/deck.css`

Referência oficial: [webslides.tv](https://webslides.tv/)

---

## 🚀 Como abrir e apresentar

1. Abra o arquivo **`index.html`** no navegador (Chrome, Edge ou Firefox).
2. Não é necessário instalar nada nem rodar servidor local.
3. Para apresentar em tela cheia, pressione **`F`**.
4. Para navegar, use as setas do teclado, swipe em telas de toque ou os botões na tela.

### Atalhos de teclado

| Tecla | Ação |
|-------|------|
| `←` / `→` | Navegar entre os slides (anterior / próximo) |
| `F` | Alternar tela cheia |
| `I` | Abrir/fechar o índice navegável |
| `P` | Imprimir / exportar para PDF |
| `Esc` | Fechar o índice |

Também é possível navegar por **swipe** em telas de toque.

---

## ✅ O que já está pronto

- ✅ 24 slides com hierarquia visual e textos-base
- ✅ Navegação por teclado, swipe e botões de controle
- ✅ Barra de progresso e contador de slides
- ✅ Índice navegável gerado automaticamente a partir de `data-title` / `data-section`
- ✅ Tema claro/escuro automático conforme o slide
- ✅ Layout responsivo (desktop, tablet e celular)
- ✅ Estilos de impressão para exportação em PDF (A4 paisagem)
- ✅ Campos pendentes marcados com `—` e `class="fill"`
- ✅ Tokens de cor centralizados em `assets/css/deck.css`

---

## 📝 Como inserir os dados

Cada slide é uma `<section>` dentro de `<article id="webslides">`. O comentário acima de cada seção indica o número do slide e o que deve ser editado.

### Campos pendentes

Procure por estes marcadores no HTML:

| Marcador | Significado |
|----------|-------------|
| `class="fill"` | Valor que será preenchido (ex.: métricas do trimestre anterior) |
| `data-field="..."` | Nome do campo, útil para localizar e substituir em massa |
| `—` | Travessão usado como placeholder visual |
| `A validar` / `A preencher` / `A definir` | Pills de status que indicam pendência |

Exemplo:

```html
<span class="metric-value fill" data-field="escolas_atendidas" title="Inserir dado">—</span>
```

**Procedimento:** substitua o `—` pelo valor real e, opcionalmente, remova a classe `fill`.

### Índice automático

O índice é gerado a partir dos atributos de cada seção:

```html
<section data-title="Novembro 2026" data-section="Calendário">
```

Se mudar o nome de um slide, atualize `data-title` e `data-section` para manter o índice coerente.

### Cores e identidade visual

Os tokens ficam no início de `assets/css/deck.css`:

```css
--brand: #6B25D6;      /* roxo elétrico */
--brand-2: #6428D4;
--lilac: #A755F7;      /* lilás */
--magenta: #FF3B9E;    /* magenta */
--coral-brand: #F87185; /* coral */
--ink: #0F172A;        /* texto principal */
```

Alterar esses valores atualiza o deck inteiro. A tipografia usa **Poppins** nos títulos e **Inter** no corpo, carregadas via Google Fonts no `index.html`.

---

## 📄 Exportar para PDF

1. Abra o `index.html` no navegador.
2. Pressione **`P`** ou use o botão de impressão no rodapé.
3. No destino, escolha **Salvar como PDF**.
4. Use o formato **A4 paisagem** e ative a opção **Gráficos de fundo**.
5. Cada slide ocupa uma página do PDF.

---

## 🎨 Personalização

- **Cores:** edite os tokens CSS em `assets/css/deck.css` (seção `:root`).
- **Textos e dados:** edite diretamente o `index.html` dentro das `<section>` correspondentes.
- **Favicon:** substitua `assets/img/favicon.svg`.
- **Ordem dos slides:** mova os blocos `<section>` dentro de `<article id="webslides">` e ajuste o número nos comentários.

---

## 🔧 Solução de problemas

| Problema | Possível causa | Solução |
|----------|----------------|---------|
| Apresentação não abre | Caminho do arquivo incorreto | Abra o `index.html` diretamente pelo navegador (`Ctrl+O`) |
| Índice não aparece | `data-title` ausente ou mal formado | Verifique os atributos `data-title` e `data-section` nas seções |
| Cores não mudaram | Cache do navegador | Pressione `Ctrl+F5` para recarregar os assets |
| PDF com fundo branco | "Gráficos de fundo" desativado | Ative a opção nas configurações de impressão do navegador |
| Layout quebrado no celular | Zoom ou orientação bloqueada | Use modo retrato/paisagem normalmente; o deck é responsivo |

---

## 🤝 Contribuição

1. Preencha os campos marcados com `—` e `class="fill"` conforme os dados forem confirmados.
2. Atualize o mapa de slides se adicionar ou remover seções.
3. Mantenha os tokens de cor e a tipografia consistentes com a identidade da InnovEdu.
4. Valide o calendário, escopo e indicadores com a rede municipal antes de congelar a versão final.
5. Abra um pull request descrevendo o que foi preenchido ou ajustado.

---

## 📊 Versionamento e changelog

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0.0 | Nov/2026 | Primeira versão com 24 slides e estrutura base do planejamento trimestral do ciclo 4 |

---

## 📚 Base e créditos

- **WebSlides 1.5.0** — Jose Luís Antúnez e contribuidores (licença MIT)
- **Tipografia** — Poppins e Inter (Google Fonts)
- **Tokens visuais** — paleta da identidade InnovEdu (`#6B25D6`, `#FF3B9E`, `#F87185`, `#A755F7`, `#FFFFFF`)
- **Conteúdo operacional** — baseado no POP InnovEdu (avaliações impressas e digitais)

---

## ⚠️ Observação importante

As datas de semana, metas e indicadores são uma **proposta de trabalho**. Valide o calendário, o escopo e os números com a rede municipal e as áreas responsáveis antes de congelar a versão final da apresentação.
