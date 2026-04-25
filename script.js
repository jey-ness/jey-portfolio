  var currentTab = 'highlights';
  var tabNames = ['highlights','clover','shoplift','elementor','other','about'];
  var projectIds = ['reporting','urlbeta','testcreation','pricing','dsm','experts','playground','redesign','andco','storemaven','ifever'];
  var lightboxScale = 1;

  function setHash(hash) {
    if (window.location.hash === hash) {
      routeFromHash();
    } else {
      window.location.hash = hash;
    }
  }

  function switchTab(t, updateUrl) {
    currentTab = t;
    if (updateUrl !== false) setHash('#' + t);
    document.getElementById('mainFolders').style.display = 'block';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    document.querySelectorAll('.tab').forEach(function(el,i){ el.classList.toggle('active', tabNames[i]===t); });
    document.querySelectorAll('.panel').forEach(function(el){ el.classList.remove('active'); });
    var p = document.getElementById('panel-'+t);
    if(p) p.classList.add('active');
  }

  function openDetail(id, updateUrl) {
    if (updateUrl !== false) setHash('#project-' + id);
    document.getElementById('mainFolders').style.display = 'none';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    var d = document.getElementById('detail-'+id);
    if(d) d.classList.add('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function openContact(updateUrl) {
    if (updateUrl !== false) setHash('#contact');
    document.getElementById('mainFolders').style.display = 'none';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    document.getElementById('contactView').classList.add('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function showConfirmation() {
    document.getElementById('confirmationModal').classList.add('open');
  }

  function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('open');
  }

  function applyImageZoom() {
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxZoom = document.getElementById('lightboxZoom');
    lightboxImage.style.transform = 'scale(' + lightboxScale + ')';
    lightboxZoom.textContent = Math.round(lightboxScale * 100) + '%';
  }

  function changeImageZoom(amount) {
    lightboxScale = Math.max(0.5, Math.min(3, lightboxScale + amount));
    applyImageZoom();
  }

  function resetImageZoom() {
    lightboxScale = 1;
    applyImageZoom();
  }

  function openImageLightbox(img) {
    var lightbox = document.getElementById('imageLightbox');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxCaption = document.getElementById('lightboxCaption');
    resetImageZoom();
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || 'Expanded project image';
    var caption = '';
    var figure = img.closest('figure');
    if (figure) {
      var figcaption = figure.querySelector('figcaption');
      if (figcaption) caption = figcaption.textContent;
    }
    lightboxCaption.textContent = caption || img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeImageLightbox() {
    var lightbox = document.getElementById('imageLightbox');
    var lightboxImage = document.getElementById('lightboxImage');
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImage.src = '';
    resetImageZoom();
  }

  function returnToHome() {
    closeConfirmation();
    switchTab('highlights');
    return true;
  }

  function closeDetail() {
    switchTab(currentTab || 'highlights');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function routeFromHash() {
    var slug = window.location.hash.replace('#','');
    if (slug === 'contact') {
      openContact(false);
      return;
    }
    if (slug.indexOf('project-') === 0) {
      var projectId = slug.replace('project-','');
      if (projectIds.indexOf(projectId) > -1) {
        openDetail(projectId, false);
        return;
      }
    }
    if (slug === 'best') {
      switchTab('highlights', false);
      return;
    }
    if (tabNames.indexOf(slug) > -1) {
      switchTab(slug, false);
      return;
    }
    switchTab('highlights', false);
  }

  window.addEventListener('hashchange', routeFromHash);
  document.addEventListener('click', function(event) {
    if (event.target.classList && event.target.classList.contains('detail-img')) {
      openImageLightbox(event.target);
    }
    if (event.target.id === 'imageLightbox') {
      closeImageLightbox();
    }
  });
  document.getElementById('imageLightbox').addEventListener('wheel', function(event) {
    event.preventDefault();
    changeImageZoom(event.deltaY > 0 ? -0.15 : 0.15);
  }, { passive: false });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeImageLightbox();
    } else if (document.getElementById('imageLightbox').classList.contains('open') && (event.key === '+' || event.key === '=')) {
      changeImageZoom(0.25);
    } else if (document.getElementById('imageLightbox').classList.contains('open') && event.key === '-') {
      changeImageZoom(-0.25);
    } else if (document.getElementById('imageLightbox').classList.contains('open') && event.key === '0') {
      resetImageZoom();
    }
  });

  var contactForm = document.querySelector('.contact-form');
  var formNote = document.getElementById('formNote');
  var formNextUrl = document.getElementById('formNextUrl');
  if (formNextUrl) {
    formNextUrl.value = window.location.origin + window.location.pathname + '#highlights';
  }
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var submitButton = contactForm.querySelector('button[type="submit"]');
      var originalText = submitButton.textContent;
      formNote.classList.remove('visible');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (!response.ok) throw new Error('Form submit failed');
        contactForm.reset();
        showConfirmation();
      }).catch(function() {
        formNote.classList.add('visible');
      }).finally(function() {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
    });
  }
  routeFromHash();
