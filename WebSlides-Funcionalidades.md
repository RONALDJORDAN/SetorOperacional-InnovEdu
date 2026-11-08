# WebSlides - Especificação de Funcionalidades

Estudo dos projetos WebSlides localizados em:

- `P:\Projetos\processos-operacionais\WebSlides` (fonte, v1.5.0)
- `P:\Projetos\processos-operacionais\webslides-latest` (distribuição compilada)

---

## 1. Visão Geral

WebSlides é uma biblioteca frontend (HTML/CSS/JS) para criar apresentações, landings e longforms de forma simples e bonita. Requer apenas conhecimento básico de HTML e CSS. Direcionado a designers, marketers e jornalistas que querem focar no conteúdo.

- **Licença:** MIT
- **Autor:** Jose Luís Antúnez (@jlantunez)
- **Contribuidores:** Luís Sacristán, Antonio Laguna
- **Baseado em:** SimpleSlides (Jenn Schiffer)
- **Versão:** 1.5.0
- **Site/Demos:** https://webslides.tv/demos

---

## 2. Estrutura dos Projetos

### `WebSlides/` (fonte)
Contém o código-fonte completo, build, testes e demos.

```
WebSlides/
├── src/
│   ├── js/
│   │   ├── modules/webslides.js   # Core
│   │   ├── modules/slide.js       # Slide
│   │   ├── plugins/               # 11 plugins
│   │   └── utils/                 # Utilitários DOM, teclas, easing, etc.
│   └── scss/
│       ├── modules/*.scss         # Componentes CSS
│       └── utils/*.scss           # Reset, mixins, animações, bugs
├── static/
│   ├── js/webslides.js            # Build compilado
│   ├── js/webslides.min.js        # Build minificado
│   ├── js/svg-icons.js            # Ícones SVG (opcional)
│   └── css/webslides.css          # CSS compilado
├── demos/*.html                   # Demos e documentação de classes
├── test/modules/webslides.test.js # Testes (Jest)
├── webpack.config.js              # Build Webpack 3
├── package.json                   # Dependências e scripts
├── .babelrc, .eslintrc, .sass-lint.yml, .travis.yml
├── index.html, error.html
├── README.md, CHANGELOG.md, LICENSE
└── zip-release.js                 # Empacotamento de release
```

### `webslides-latest/` (distribuição)
Versão pronta para uso, contendo apenas os arquivos estáticos compilados, demos e imagens (sem src/test/build).

```
webslides-latest/
├── index.html
├── error.html
├── README.md
├── LICENSE
├── static/
│   ├── css/webslides.css
│   ├── css/svg-icons.css
│   ├── js/webslides.js
│   ├── js/webslides.min.js
│   ├── js/svg-icons.js
│   └── images/
└── demos/*.html
```

---

## 3. Funcionalidades Principais

### 3.1 Navegação
- **Deslizamento horizontal e vertical** (`<article id="webslides" class="vertical">`)
- **Apresentação remota:** touchpad, atalhos de teclado e swipe (toque)
- **Contador de slides:** `atual / total`
- **Permalinks:** navegação direta via URL (`#slide=N`)
- **Autoslide:** avanço automático configurável por tempo
- **Click to nav:** clique em qualquer lugar para mudar de slide
- **Botões prev/next** setas na tela
- **Tela cheia (fullscreen)** via tecla `F` ou API

### 3.2 Opções do Core (`WebSlides`)

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `autoslide` | number\|boolean | `false` | Intervalo em ms para avanço automático |
| `changeOnClick` | boolean | `false` | Clique em qualquer lugar muda o slide |
| `loop` | boolean | `true` | Volta ao primeiro slide após o último |
| `minWheelDelta` | number | `40` | Delta mínimo da roda para navegar |
| `navigateOnScroll` | boolean | `true` | Scroll dispara navegação |
| `scrollWait` | number | `450` | Tempo de espera entre navegações por scroll (ms) |
| `slideOffset` | number | `50` | Delta mínimo de toque para navegar (px) |
| `showIndex` | boolean | `true` | Mostra o índice/contador |

### 3.3 API do Core (`new WebSlides(opts)`)

- `goToSlide(slideI, forward)` - Vai para um slide específico por índice
- `goNext()` - Avança para o próximo slide
- `goPrev()` - Volta para o slide anterior
- `toggleZoom()` - Alterna zoom
- `disable()` - Desabilita a navegação (classe `.disabled`)
- `enable()` - Reabilita a navegação
- `isDisabled()` - Retorna se está desabilitado
- `fullscreen()` - Alterna tela cheia do navegador
- `static registerPlugin(key, cto)` - Registra/substitui plugins

### 3.4 Eventos Customizados

- `ws:init` - Disparado quando a instância é inicializada
- `ws:slide-change` - Disparado na troca de slide (detalhe: `slides`, `currentSlide0`, `currentSlide`)

---

## 4. Plugins (11 plugins incluídos)

Todos instanciados automaticamente no core e acessíveis via `ws.plugins.<nome>`.

| Plugin | Funcionalidade |
|--------|----------------|
| **AutoSlide** | Reprodução automática dos slides (`play()`, `stop()`) |
| **ClickNav** | Navegação por clique em qualquer ponto da slide |
| **Grid** | Layout em grid automático |
| **Hash** | Permalink via `#slide=N`, sincroniza URL e navegação |
| **Keyboard** | Teclas: setas, Espaço, Page Up/Down, Home, End, `F` (fullscreen) |
| **Navigation** | Botões prev/next + contador `atual / total` + links `[data-slide]` |
| **Scroll** | Navegação por roda do mouse (`wheel`) com limiar configurável |
| **Touch** | Swipe em dispositivos móveis, toque duplo/pinch para zoom |
| **Video** | Vídeo de fundo HTML5 (`<video class="background-video">`) |
| **YouTube** | Integração com embeds do YouTube |
| **Zoom** | Zoom da apresentação (acionado também pelo contador) |

---

## 5. Arquitetura de Markup

Cada `<section>` dentro de `<article id="webslides">` é uma slide individual.

```html
<article id="webslides">
  <section>
    <h1>Slide 1</h1>
  </section>
  <section class="bg-black aligncenter">
    <div class="wrap">
      <h1>Slide 2</h1>
    </div>
  </section>
</article>
```

- **Vertical sliding:** `<article id="webslides" class="vertical">`
- **`.wrap`**: container de 90% (pode ser `.wrap size-50`, `.wrap size-60`, etc.)
- **Inicialização:** `window.ws = new WebSlides();` + `<script src="webslides.js"></script>`
- **Opcional:** `<script defer src="svg-icons.js"></script>` para ícones Font Awesome como SVG

---

## 6. Classes CSS e Componentes (40+)

### 6.1 Layout e Alinhamento
- `.alignleft`, `.alignright`, `.aligncenter` - alinhamento de conteúdo
- `.slide-top`, `.slide-bottom` - posicionamento vertical da slide
- `.content-left`, `.content-center`, `.content-right` - posicionamento interno
- `header` / `footer` com `.wrap` (container 1200px)

### 6.2 Grid
- `.grid > .column` - colunas com auto-fill e altura igual
- `.grid.vertical-align` - alinhamento vertical
- `.grid.sm` / `.grid.ms` / `.grid.sms` - layouts sidebar/main

### 6.3 Cards
- `.card-50`, `.card-60`, `.card-40` - blocos de cartão com larguras proporcionais
- `.flex-content` - conteúdo interno do card

### 6.4 Backgrounds (cores)
- Corporativas: `.bg-primary`, `.bg-secondary`, `.bg-light`
- Gerais: `.bg-black`, `.bg-black-blue`, `.bg-gray`, `.bg-white`, `.bg-red`, `.bg-green`, `.bg-blue`, `.bg-purple`
- Transparentes: `.bg-trans-dark`, `.bg-trans-light`
- Gradientes: `.bg-gradient-h`, `.bg-gradient-r`, `.bg-gradient-v`

### 6.5 Backgrounds (imagens/vídeo)
- `.background` (cover fullscreen) + 16 posições:
  `.background-top`, `.background-bottom`, `.background-center`, `.background-center-top`, `.background-center-bottom`, `.background-left`, `.background-left-top`, `.background-left-bottom`, `.background-right`, `.background-right-top`, `.background-right-bottom`
- `.background.light`, `.background.dark` - sobreposição de opacidade
- `.background.anim` - fundo animado
- `.background-video` - vídeo de fundo fullscreen (`autoplay muted loop`)
- Uso com Unsplash: `<span class="background" style="background-image:url(...)">`

### 6.6 Flexible Blocks (`.flexblock`)
- `.flexblock` - blocos flexíveis com auto-fill e altura igual
- Modificadores: `.blink` (bloco inteiro clicável), `.border`
- Variantes semânticas: `.flexblock.clients`, `.flexblock.features`, `.flexblock.gallery`, `.flexblock.metrics`, `.flexblock.plans`, `.flexblock.specs`, `.flexblock.reasons`, `.flexblock.steps`, `.flexblock.activity`

### 6.7 Tipografia (fontes: Roboto, Maitree, San Francisco)
- `.text-landing`, `.text-intro`, `.text-subtitle`, `.text-shadow`
- `.text-data`, `.text-context`, `.text-cols`, `.text-label`
- `.text-serif` (Maitree)
- `.text-pull-right`, `.text-pull-left`
- `.text-symbols` (`* * *`)

### 6.8 Outros Componentes CSS (módulos SCSS)
`avatars`, `badges`, `browser`, `button`, `cards`, `form`, `grid`, `header-footer`, `logo`, `longform`, `media`, `navigation`, `print`, `promos`, `quotes`, `slides`, `slides-bg`, `slides-navigation`, `tables`, `toc`, `work`, `zoom`

---

## 7. Utilitários JavaScript (`src/js/utils/`)

- `dom.js` - manipulação de DOM, eventos customizados, show/hide
- `keys.js` - códigos de teclas (setas, espaço, home, end, page up/down, F)
- `easing.js` - funções de easing para animações
- `scroll-to.js` - rolagem animada para posição
- `mobile-detector.js` - detecção de dispositivos móveis/pointer/touch
- `custom-event.js` - polyfill de CustomEvent

---

## 8. Build e Desenvolvimento

Gerenciado via `package.json` (Webpack 3 + Babel + node-sass).

| Script | Comando | Descrição |
|--------|---------|-----------|
| `build` | `npm-run-all -s lint build:\*` | Lint + build normal e minificado |
| `build:normal` | `webpack` | Build não minificado |
| `build:min` | `webpack -p -output-filename [name].min.js` | Build minificado para produção |
| `lint` | `npm-run-all -p lint:\*` | Lint JS (eslint), testes e CSS (sass-lint) |
| `dev` | `webpack-dev-server` | Servidor de desenvolvimento com hot reload |
| `test` | `jest && codecov` | Testes unitários + cobertura |
| `preversion` | `npm jest` | Testes antes de versionar |
| `postversion` | build + zip-release + git push | Empacota release após versionar |

Dependências de desenvolvimento: webpack, babel-loader, node-sass, sass-loader, autoprefixer, eslint, jest, simulant, archiver (zip).

---

## 9. Extensões Recomendadas

Pode-se adicionar facilmente:
- **Unsplash** - fotos de fundo gratuitas
- **animate.css** - animações CSS
- **particles.js** - partículas no fundo
- **AOS (Animate On Scroll)** - animações ao rolar (útil para longforms)
- **pt** - tipografia

---

## 10. Casos de Uso Sugeridos

Conforme os demos incluídos (`demos/*.html`):
- **Apresentações (keynote-like)** - slides com navegação por teclado/swipe
- **Landings** - páginas de conversão com sections e backgrounds
- **Portfolios** - galeria de trabalhos com `.flexblock.gallery` e `.card-*`
- **Longform articles** - artigos longos com rolagem e AOS
- **Interviews** - entrevistas com depoimentos e quotes
- **Media kits** - conteúdos para imprensa com vídeos e imagens
- **Netflix-style culture** - cultura organizacional com gradientes e cards

---

## 11. Diferença entre os dois projetos

| Aspecto | `WebSlides/` | `webslides-latest/` |
|---------|--------------|---------------------|
| Tipo | Fonte completa | Distribuição compilada |
| `src/` (JS/SCSS) | Sim | Não |
| `test/` (Jest) | Sim | Não |
| Build tools (webpack, babel) | Sim | Não |
| `static/js/webslides.js` | Sim (build) | Sim (compilado) |
| `static/css/webslides.css` | Sim (build) | Sim (compilado) |
| Demos | Sim | Sim |
| Uso direto | Requer build | Pronto para usar |

Ambos compartilham a mesma documentação (`README.md` idêntico), licença MIT e conjunto de demos.

---

*Documento gerado a partir da leitura direta dos fontes dos projetos WebSlides locais.*
