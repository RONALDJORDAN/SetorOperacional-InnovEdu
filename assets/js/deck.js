/* ==========================================================================
   PLANEJAMENTO TRIMESTRAL · NOV 2026 — JAN 2027
   Controles do deck: índice, progresso, tema, impressão e atalhos.
   ========================================================================== */
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('#webslides > section'));
  var total = slides.length;

  var currentEl = document.getElementById('deck-current');
  var totalEl = document.getElementById('deck-total');
  var progressBar = document.getElementById('deck-progress-bar');
  var indexEl = document.getElementById('deck-index');
  var indexGrid = document.getElementById('deck-index-grid');
  var indexButton = document.getElementById('deck-index-btn');
  var printButton = document.getElementById('deck-print-btn');
  var fullscreenButton = document.getElementById('deck-fullscreen-btn');
  var prevButton = document.getElementById('deck-prev');
  var nextButton = document.getElementById('deck-next');

  var ws = null;

  function pad(number) {
    return String(number).padStart(2, '0');
  }

  function setUI(current) {
    if (!current || current < 1 || current > total) {
      current = 1;
    }

    currentEl.textContent = pad(current);
    progressBar.style.width = ((current / total) * 100).toFixed(2) + '%';

    var section = slides[current - 1];
    var isCover = current === 1;

    document.body.classList.toggle('is-cover', isCover);
    document.body.classList.toggle('theme-dark', section.classList.contains('slide--dark'));

    var items = indexGrid.querySelectorAll('.index-item');
    Array.prototype.forEach.call(items, function (item, index) {
      var active = index === current - 1;
      item.classList.toggle('is-current', active);
      item.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function buildIndex() {
    slides.forEach(function (section, index) {
      var button = document.createElement('button');
      var number = document.createElement('span');
      var body = document.createElement('span');
      var sectionName = document.createElement('span');
      var title = document.createElement('span');

      button.type = 'button';
      button.className = 'index-item';
      button.setAttribute('aria-label', 'Ir para o slide ' + (index + 1) + ': ' + (section.dataset.title || ''));

      number.className = 'index-num';
      number.textContent = pad(index + 1);

      body.className = 'index-body';

      sectionName.className = 'index-section';
      sectionName.textContent = section.dataset.section || 'Apresentação';

      title.className = 'index-title';
      title.textContent = section.dataset.title || 'Slide ' + (index + 1);

      body.appendChild(sectionName);
      body.appendChild(title);
      button.appendChild(number);
      button.appendChild(body);

      button.addEventListener('click', function () {
        closeIndex(false);
        if (ws) {
          ws.goToSlide(index);
        }
      });

      indexGrid.appendChild(button);
    });
  }

  function openIndex() {
    indexEl.classList.add('is-open');
    indexEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('index-open');

    if (ws) {
      ws.disable();
    }

    var current = indexGrid.querySelector('.index-item.is-current');
    if (current) {
      current.focus({ preventScroll: true });
    }
  }

  function closeIndex(restoreFocus) {
    indexEl.classList.remove('is-open');
    indexEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('index-open');

    if (ws) {
      ws.enable();
    }

    if (restoreFocus !== false && indexButton) {
      indexButton.focus({ preventScroll: true });
    }
  }

  function toggleIndex() {
    if (indexEl.classList.contains('is-open')) {
      closeIndex();
    } else {
      openIndex();
    }
  }

  function printDeck() {
    if (indexEl.classList.contains('is-open')) {
      closeIndex(false);
    }
    window.print();
  }

  // Constrói o índice antes de inicializar o WebSlides.
  buildIndex();
  totalEl.textContent = pad(total);

  // Transição de tela: entrada lateral suave a cada troca de slide.
  var lastSlide = null;
  var enterTimer = null;

  function animateSlide(section, forward) {
    section.classList.remove('deck-enter-forward', 'deck-enter-backward');
    void section.offsetWidth; // reinicia a animação
    section.classList.add(forward ? 'deck-enter-forward' : 'deck-enter-backward');

    clearTimeout(enterTimer);
    enterTimer = setTimeout(function () {
      section.classList.remove('deck-enter-forward', 'deck-enter-backward');
    }, 800);
  }

  // Atualiza o chrome e a transição a cada troca de slide.
  // O WebSlides dispara o evento no próprio elemento #webslides (sem bubble).
  var webslidesEl = document.getElementById('webslides');

  webslidesEl.addEventListener('ws:slide-change', function (event) {
    var current = event.detail.currentSlide;
    var section = slides[current - 1];

    if (section && lastSlide !== null && current !== lastSlide) {
      animateSlide(section, current > lastSlide);
    }

    lastSlide = current;
    setUI(current);
  });

  webslidesEl.addEventListener('animationend', function (event) {
    if (event.target.parentElement === webslidesEl) {
      event.target.classList.remove('deck-enter-forward', 'deck-enter-backward');
    }
  });

  // Inicializa o WebSlides.
  ws = new WebSlides({
    loop: false,
    showIndex: false,
    changeOnClick: false,
    navigateOnScroll: true,
    scrollWait: 500
  });

  window.ws = ws;

  // Impressão/PDF sempre na ordem original do deck. O WebSlides reordena as
  // seções no DOM durante a navegação; restauramos a ordem antes de imprimir
  // e devolvemos o estado anterior ao fechar a janela de impressão.
  var printOrderBackup = null;

  function applySlideOrder(order) {
    order.forEach(function (section) {
      webslidesEl.appendChild(section);
    });
  }

  window.addEventListener('beforeprint', function () {
    printOrderBackup = Array.prototype.slice.call(webslidesEl.children);
    applySlideOrder(slides);
  });

  window.addEventListener('afterprint', function () {
    if (printOrderBackup) {
      applySlideOrder(printOrderBackup);
      printOrderBackup = null;
    }
  });

  // Se a URL já abriu em um slide específico (#slide=N), respeita a posição.
  var initial = 1;
  if (typeof ws.currentSlideI_ === 'number' && ws.currentSlideI_ >= 0) {
    initial = ws.currentSlideI_ + 1;
  }
  setUI(initial);

  // Controles.
  prevButton.addEventListener('click', function () {
    ws.goPrev();
  });

  nextButton.addEventListener('click', function () {
    ws.goNext();
  });

  indexButton.addEventListener('click', toggleIndex);
  printButton.addEventListener('click', printDeck);
  fullscreenButton.addEventListener('click', function () {
    ws.fullscreen();
  });

  Array.prototype.forEach.call(
    indexEl.querySelectorAll('[data-close-index]'),
    function (element) {
      element.addEventListener('click', function () {
        closeIndex();
      });
    }
  );

  // Evita que o scroll do índice dispare a navegação do deck.
  indexEl.addEventListener('wheel', function (event) {
    event.stopPropagation();
  }, { passive: true });

  // Atalhos próprios (o WebSlides já cuida de setas, espaço, Home e End).
  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var isTyping = target && (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable
    );

    if (isTyping) {
      return;
    }

    var key = event.key.toLowerCase();

    if (key === 'i') {
      event.preventDefault();
      toggleIndex();
      return;
    }

    if (key === 'p' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      printDeck();
      return;
    }

    if (key === 'escape' && indexEl.classList.contains('is-open')) {
      event.preventDefault();
      closeIndex();
    }
  });
})();
