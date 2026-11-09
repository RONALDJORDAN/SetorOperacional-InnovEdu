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
  var pdfButton = document.getElementById('deck-pdf-btn');
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

  // ============================================================================
  // MODAL UNIFICADO DE EMISSÃO · IMPRIMIR / BAIXAR PDF
  // ============================================================================
  var emitModalEl = document.getElementById('emit-modal');
  var emitBackdrop = emitModalEl ? emitModalEl.querySelector('.emit-backdrop') : null;
  var emitCloseBtns = emitModalEl ? emitModalEl.querySelectorAll('[data-emit-close]') : [];
  var emitConfirmBtn = document.getElementById('emit-confirm');
  var emitScopeRadios = document.querySelectorAll('input[name="emit-scope"]');
  var emitPagesWrap = document.getElementById('emit-pages');
  var emitPageList = document.getElementById('emit-page-list');
  var emitDestRadios = document.querySelectorAll('input[name="emit-dest"]');

  var slideSections = Array.prototype.slice.call(document.querySelectorAll('#webslides > section'));

  function openEmitModal() {
    if (indexEl.classList.contains('is-open')) {
      closeIndex(false);
    }

    // Recolecta os slides atualizados (o WebSlides pode reordenar o DOM).
    slideSections = Array.prototype.slice.call(document.querySelectorAll('#webslides > section'));

    buildPageList();
    updatePageListVisibility();
    updateSummary();

    emitModalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('emit-modal-open');

    var firstFocus = emitModalEl.querySelector('.emit-btn--cancel');
    if (firstFocus) {
      firstFocus.focus({ preventScroll: true });
    }
  }

  function closeEmitModal() {
    emitModalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('emit-modal-open');
  }

  function buildPageList() {
    if (!emitPageList) {
      return;
    }
    emitPageList.innerHTML = '';
    slideSections.forEach(function (section, index) {
      var item = document.createElement('label');
      item.className = 'emit-page-item';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'emit-page';
      checkbox.value = index;
      checkbox.checked = true;

      var title = section.dataset.title || 'Slide ' + (index + 1);
      var num = document.createElement('span');
      num.textContent = (index + 1).toString().padStart(2, '0');

      var labelSpan = document.createElement('span');
      labelSpan.textContent = title;

      item.appendChild(checkbox);
      item.appendChild(num);
      item.appendChild(labelSpan);
      emitPageList.appendChild(item);
    });
  }

  function updatePageListVisibility() {
    var custom = document.querySelector('input[name="emit-scope"]:checked').value === 'custom';
    if (emitPagesWrap) {
      emitPagesWrap.style.display = custom ? 'block' : 'none';
    }
    updateEta();
  }

  function countSelectedPages() {
    var all = document.querySelectorAll('input[name="emit-page"]:checked');
    return all.length;
  }

  function updateEta() {
    var etaEl = document.getElementById('summary-eta');
    if (!etaEl) {
      return;
    }
    var scopeInput = document.querySelector('input[name="emit-scope"]:checked');
    var count = scopeInput && scopeInput.value === 'all' ? slideSections.length : countSelectedPages();
    var seconds = Math.ceil(count * 3); // ~3s por slide com escala 1.0
    var minutes = Math.floor(seconds / 60);
    var secs = seconds % 60;
    var text = minutes > 0 ? minutes + ' min ' + secs + ' s' : secs + ' s';
    etaEl.textContent = count > 0 ? '~' + text : '—';
  }

  function updateSummary() {
    var destEl = document.getElementById('summary-dest');
    var scopeEl = document.getElementById('summary-scope');

    var dest = document.querySelector('input[name="emit-dest"]:checked');
    var scope = document.querySelector('input[name="emit-scope"]:checked');

    if (destEl && dest) {
      destEl.textContent = dest.value === 'print' ? 'Imprimir' : 'Baixar PDF';
    }
    if (scopeEl && scope) {
      scopeEl.textContent = scope.value === 'all' ? 'Todas as páginas' : 'Páginas específicas';
    }
    updateEta();
  }

  function getSelectedPages() {
    var all = document.querySelectorAll('input[name="emit-page"]:checked');
    return Array.prototype.map.call(all, function (cb) {
      return parseInt(cb.value, 10);
    });
  }

  // Renderiza um slide isoladamente (ignora posicionamento off-screen do WebSlides).
  async function renderSlide(section) {
    var clone = section.cloneNode(true);
    clone.removeAttribute('id');

    // Largura fixa do papel A4 paisagem (px) para manter proporções e layout consistente no PDF.
    var renderW = Math.round(297 * 96 / 25.4); // 297 mm a 96 dpi

    // Remove elementos pesados que não agregam ao PDF (vídeos, iframes, scripts, áudios).
    Array.prototype.forEach.call(clone.querySelectorAll('video, audio, iframe, script, noscript'), function (el) {
      el.remove();
    });

    clone.style.position = 'relative';
    clone.style.transform = 'none';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.display = 'block';
    clone.style.visibility = 'visible';
    clone.style.opacity = '1';
    clone.style.width = renderW + 'px';
    clone.style.height = 'auto';
    clone.style.minHeight = '0';
    clone.style.overflow = 'visible';
    clone.style.background = 'inherit';
    clone.style.pageBreakAfter = 'auto';

    document.body.appendChild(clone);
    clone.offsetHeight; // forçar reflow

    var canvas = await html2canvas(clone, {
      scale: 1.0,               // reduzido de 1.4 para acelerar (A4 já tem boa resolução)
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 1500,
      removeContainer: true,
      ignoreElements: function (el) {
        // Ignora elementos ocultos ou de decoração que pesam na renderização.
        return el.classList && (
          el.classList.contains('cover-glow') ||
          el.classList.contains('cover-grid') ||
          el.classList.contains('closing-glow') ||
          el.classList.contains('module-glow') ||
          el.classList.contains('deck-progress') ||
          el.classList.contains('deck-header') ||
          el.classList.contains('deck-footer')
        );
      }
    });

    document.body.removeChild(clone);
    return canvas;
  }

  // Pequeno delay para não travar a thread principal entre slides.
  function tick(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  async function runEmit() {
    var dest = document.querySelector('input[name="emit-dest"]:checked').value;
    var scope = document.querySelector('input[name="emit-scope"]:checked').value;

    if (dest === 'print') {
      // Impressão via navegador (A4 paisagem controlada pelo CSS @media print).
      closeEmitModal();
      window.print();
      return;
    }

    // === Baixar PDF ===
    closeEmitModal();

    var pages = scope === 'all'
      ? slideSections.map(function (_, i) { return i; })
      : getSelectedPages();

    if (pages.length === 0) {
      alert('Selecione ao menos uma página para exportar.');
      openEmitModal();
      return;
    }

    // Barra de progresso temporária.
    var progressOverlay = document.createElement('div');
    progressOverlay.className = 'emit-progress-overlay';
    progressOverlay.innerHTML =
      '<div class="emit-progress-panel">' +
      '  <p class="emit-progress-title">Gerando PDF</p>' +
      '  <p class="emit-progress-desc">Processando <span class="emit-progress-current">0</span> de <span class="emit-progress-total">' +
      pages.length + '</span> páginas</p>' +
      '  <div class="emit-progress-wrap"><div class="emit-progress-bar" style="width:0%"></div></div>' +
      '</div>';
    document.body.appendChild(progressOverlay);
    var progressBar = progressOverlay.querySelector('.emit-progress-bar');
    var progressCurrent = progressOverlay.querySelector('.emit-progress-current');

    function setProgress(current) {
      var pct = Math.round((current / pages.length) * 100);
      if (progressBar) {
        progressBar.style.width = pct + '%';
      }
      if (progressCurrent) {
        progressCurrent.textContent = current;
      }
    }

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // PDF sempre em A4 paisagem (297 × 210 mm).
      var pdf = new window.jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      var pageW = 297;
      var pageH = 210;

      for (var i = 0; i < pages.length; i++) {
        setProgress(i + 1);

        var canvas = await renderSlide(slideSections[pages[i]]);
        var imgData = canvas.toDataURL('image/jpeg', 0.85);

        if (i > 0) {
          pdf.addPage();
        }
        // Ajusta a imagem preservando a proporção (sem esticar), centralizada na página.
        var imgAspect = canvas.width / canvas.height;
        var pageAspect = pageW / pageH;
        var drawW, drawH, drawX, drawY;

        if (imgAspect > pageAspect) {
          // Imagem mais larga que a página: ajusta pela largura, sobram margens verticais.
          drawW = pageW;
          drawH = pageW / imgAspect;
          drawX = 0;
          drawY = (pageH - drawH) / 2;
        } else {
          // Imagem mais alta (ou igual) que a página: ajusta pela altura, sobram margens laterais.
          drawH = pageH;
          drawW = pageH * imgAspect;
          drawX = (pageW - drawW) / 2;
          drawY = 0;
        }

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', drawX, drawY, drawW, drawH);

        // Libera a thread principal a cada slide para não travar a interface.
        if (i < pages.length - 1) {
          await tick(0);
        }
      }

      var safeTitle = (document.title || 'planejamento')
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-+|-+$/g, '') || 'planejamento';
      pdf.save(safeTitle + '.pdf');
    } catch (err) {
      console.error('Erro ao exportar PDF:', err);
      alert('Não foi possível gerar o PDF automaticamente.\n\nUse "Imprimir" e selecione "Salvar como PDF".');
    } finally {
      progressOverlay.remove();
    }
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
  printButton.addEventListener('click', openEmitModal);
  pdfButton.addEventListener('click', openEmitModal);
  fullscreenButton.addEventListener('click', function () {
    ws.fullscreen();
  });

  if (emitConfirmBtn) {
    emitConfirmBtn.addEventListener('click', runEmit);
  }

  Array.prototype.forEach.call(emitScopeRadios, function (radio) {
    radio.addEventListener('change', updatePageListVisibility);
  });

  Array.prototype.forEach.call(emitCloseBtns, function (btn) {
    btn.addEventListener('click', closeEmitModal);
  });

  // Clicar no card de opção seleciona o rádio correspondente.
  Array.prototype.forEach.call(document.querySelectorAll('.emit-option'), function (card) {
    card.addEventListener('click', function (event) {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') {
        return;
      }
      var radio = card.querySelector('input[type="radio"]');
      var checkbox = card.querySelector('input[type="checkbox"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      } else if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });

  // Atualiza resumo e ETA quando mudar destino/escopo/orientação.
  Array.prototype.forEach.call(emitDestRadios, function (radio) {
    radio.addEventListener('change', updateSummary);
  });

  Array.prototype.forEach.call(emitScopeRadios, function (radio) {
    radio.addEventListener('change', function () {
      updatePageListVisibility();
      updateSummary();
    });
  });

  // Atualiza ETA ao marcar/desmarcar páginas individuais.
  if (emitPageList) {
    emitPageList.addEventListener('change', function () {
      updatePageListVisibility();
      updateEta();
    });
  }

  Array.prototype.forEach.call(emitCloseBtns, function (btn) {
    btn.addEventListener('click', closeEmitModal);
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
      openEmitModal();
      return;
    }

    if (key === 'escape') {
      if (indexEl.classList.contains('is-open')) {
        event.preventDefault();
        closeIndex();
      } else if (emitModalEl && emitModalEl.getAttribute('aria-hidden') === 'false') {
        event.preventDefault();
        closeEmitModal();
      }
    }
  });
})();
