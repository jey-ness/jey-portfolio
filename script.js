  var currentTab = 'highlights';
  var tabNames = ['highlights','clover','shoplift','elementor','archive'];
  var projectIds = ['reporting','urlbeta','testcreation','pricing','dsm','experts','playground','redesign','andco','storemaven','eshel','argaz','doodles','kinder','ifever'];
  var projectTabMap = {
    reporting: 'shoplift',
    urlbeta: 'shoplift',
    testcreation: 'shoplift',
    pricing: 'shoplift',
    dsm: 'elementor',
    experts: 'elementor',
    playground: 'elementor',
    redesign: 'elementor',
    andco: 'archive',
    storemaven: 'archive',
    eshel: 'archive',
    argaz: 'archive',
    doodles: 'archive',
    kinder: 'archive',
    ifever: 'archive'
  };
  var projectRecommendations = {
    reporting: ['testcreation', 'pricing'],
    urlbeta: ['reporting', 'pricing'],
    testcreation: ['reporting', 'urlbeta'],
    pricing: ['reporting', 'testcreation'],
    dsm: ['redesign', 'experts'],
    experts: ['redesign', 'playground'],
    playground: ['experts', 'dsm'],
    redesign: ['dsm', 'experts'],
    andco: ['reporting', 'dsm'],
    storemaven: ['urlbeta', 'testcreation'],
    eshel: ['dsm', 'redesign'],
    argaz: ['redesign', 'playground'],
    doodles: ['experts', 'playground'],
    kinder: ['dsm', 'reporting'],
    ifever: ['reporting', 'redesign']
  };
  var projectCatalog = {
    reporting: {
      title: 'Test Reporting 2.0',
      tag: 'Shoplift · Core Product',
      desc: 'Statistical data in a human language',
      image: 'https://freight.cargo.site/w/1500/q/75/i/913a4cc48dd444a1784c39068d0c662cdc38d7d5e96edb76107499fd45eab4bb/Reporting2x.png',
      cardClass: 'card-shoplift'
    },
    urlbeta: {
      title: 'URL Split Testing Beta Program',
      tag: 'Shoplift · Feature Release',
      desc: 'Building a beta program around a new feature',
      image: 'https://freight.cargo.site/w/1500/q/75/i/923f68dde3fdb088504e5f8c8a3d88995d781dc45301f307f79a5f8a69824f46/URL-Cover2x.png',
      cardClass: 'card-shoplift'
    },
    testcreation: {
      title: 'Test Creation Flow',
      tag: 'Shoplift · Core Flow',
      desc: 'Rethinking the core flow of the platform',
      image: 'https://freight.cargo.site/w/1500/q/75/i/1852809cfa43f7bc2ab2ce90e12da83efda57bfda537f5343a395c243a273ef6/Preview32x.png',
      cardClass: 'card-shoplift'
    },
    pricing: {
      title: 'Pricing Model Update',
      tag: 'Shoplift · Monetization',
      desc: 'Introducing new pricing and paywall moments',
      image: 'https://freight.cargo.site/w/1500/q/75/i/27f7031bbb74ea886062884c63e6c9ad18ca3f24e16e09587a821b871bcf71c1/Preview-timely.png',
      cardClass: 'card-shoplift'
    },
    dsm: {
      title: 'Elementor Website DSM',
      tag: 'Elementor · Systems Design',
      desc: 'A complete web design system built from scratch',
      image: 'https://freight.cargo.site/w/1080/q/94/i/9bd92252ee93ccfbe48f642c494aac093a772d0c10f7a95b9804f66b64eb1543/Preview4.png',
      cardClass: 'card-elementor'
    },
    experts: {
      title: 'Elementor Experts Platform',
      tag: 'Elementor · Platform',
      desc: 'Marketplace platform for web creators',
      image: 'https://freight.cargo.site/w/1080/q/75/i/f5a33560b382fda21bcbb1bf13099139507c028e73f4533f0e88e8060afd82ef/Preview3.png',
      cardClass: 'card-elementor'
    },
    playground: {
      title: 'Container Feature Playground',
      tag: 'Elementor · Product Feature',
      desc: 'A new learning format for Flexbox containers',
      image: 'https://freight.cargo.site/w/1080/q/94/i/f97922eb35a65a84985384be39861749a814671aaed5ccaf8a176aef58c86a1d/Preview1.png',
      cardClass: 'card-elementor'
    },
    redesign: {
      title: 'Elementor Website Redesign',
      tag: 'Elementor · Website',
      desc: 'Full redesign of the product marketing site',
      image: 'https://freight.cargo.site/w/1080/q/75/i/1f168ca35e40a9e654b73f3c2b14267394560a41b4c04531ced1a32632585f17/Preview.png',
      cardClass: 'card-elementor'
    }
  };

  function setHash(hash) {
    if (window.location.hash === hash) {
      routeFromHash();
    } else {
      window.location.hash = hash;
    }
  }

  function updateActiveNavigation(tabName) {
    document.querySelectorAll('.tab[data-tab], .side-pill[data-tab], .mobile-project-menu button[data-tab], .mobile-burger-menu button[data-tab]').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-tab') === tabName);
    });
  }

  function switchTab(t, updateUrl) {
    closeMobileProjectMenu();
    closeMobileBurger();
    currentTab = t;
    if (updateUrl !== false) setHash('#' + t);
    document.getElementById('mainFolders').classList.remove('project-mode', 'project-scrolled', 'side-nav-collapsed');
    document.getElementById('mainFolders').style.display = 'block';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    updateActiveNavigation(t);
    document.querySelectorAll('.panel').forEach(function(el){ el.classList.remove('active'); });
    var p = document.getElementById('panel-'+t);
    if(p) p.classList.add('active');
  }

  function openDetail(id, updateUrl) {
    closeMobileProjectMenu();
    closeMobileBurger();
    currentTab = projectTabMap[id] || currentTab || 'highlights';
    if (updateUrl !== false) setHash('#project-' + id);
    document.getElementById('mainFolders').style.display = 'block';
    document.getElementById('mainFolders').classList.add('project-mode');
    document.getElementById('mainFolders').classList.remove('project-scrolled', 'side-nav-collapsed');
    updateActiveNavigation(currentTab);
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    var d = document.getElementById('detail-'+id);
    if(d) d.classList.add('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function openContact(updateUrl) {
    closeMobileProjectMenu();
    closeMobileBurger();
    if (updateUrl !== false) setHash('#contact');
    document.getElementById('mainFolders').classList.remove('project-mode', 'project-scrolled', 'side-nav-collapsed');
    document.getElementById('mainFolders').style.display = 'none';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    document.getElementById('contactView').classList.add('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function openAbout(updateUrl) {
    closeMobileProjectMenu();
    closeMobileBurger();
    if (updateUrl !== false) setHash('#about');
    document.getElementById('mainFolders').classList.remove('project-mode', 'project-scrolled', 'side-nav-collapsed');
    document.getElementById('mainFolders').style.display = 'none';
    document.querySelectorAll('.detail-view').forEach(function(el){ el.classList.remove('open'); });
    document.getElementById('aboutView').classList.add('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function showConfirmation() {
    document.getElementById('confirmationModal').classList.add('open');
  }

  function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('open');
  }

  function toggleAboutContactPopover() {
    document.getElementById('aboutContactPopover').classList.toggle('open');
  }

  function closeAboutContactPopover() {
    document.getElementById('aboutContactPopover').classList.remove('open');
  }

  function toggleMobileProjectMenu() {
    document.getElementById('mobileProjectMenu').classList.toggle('open');
  }

  function closeMobileProjectMenu() {
    var menu = document.getElementById('mobileProjectMenu');
    if (menu) menu.classList.remove('open');
  }

  function toggleMobileBurger() {
    var menu = document.getElementById('mobileBurgerMenu');
    if (menu) menu.classList.toggle('open');
  }

  function closeMobileBurger() {
    var menu = document.getElementById('mobileBurgerMenu');
    if (menu) menu.classList.remove('open');
  }

  function syncProjectTabMode() {
    var folders = document.getElementById('mainFolders');
    if (!folders || !folders.classList.contains('project-mode')) {
      if (folders) folders.classList.remove('project-scrolled', 'side-nav-collapsed');
      return;
    }
    var detail = document.querySelector('.detail-view.open');
    if (!detail) {
      folders.classList.remove('project-scrolled', 'side-nav-collapsed');
      return;
    }
    if (window.innerWidth <= 700) {
      folders.classList.remove('project-scrolled');
      folders.classList.add('side-nav-collapsed');
      return;
    }
    var detailRect = detail.getBoundingClientRect();
    var detailTop = detailRect.top + window.scrollY;
    var threshold = Math.max(detailTop + 140, 220);
    var projectScrolled = window.scrollY > threshold;
    folders.classList.toggle('project-scrolled', projectScrolled);

    var sideNav = document.querySelector('.side-project-nav');
    var navWidth = sideNav ? sideNav.offsetWidth || 148 : 148;
    var desiredGap = -1; /* negative = 1px overlap so tab borders merge with detail panel */
    var minLeft = 20;
    var availableWidth = detailRect.left - minLeft - desiredGap;
    var collapsed = !projectScrolled || availableWidth < navWidth;
    folders.classList.toggle('side-nav-collapsed', collapsed);

    if (sideNav && !collapsed) {
      sideNav.style.left = Math.max(minLeft, Math.round(detailRect.left - navWidth - desiredGap)) + 'px';
    } else if (sideNav) {
      sideNav.style.left = minLeft + 'px';
    }
  }

  function openImageLightbox(img) {
    var lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || '';
    document.getElementById('imageLightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeImageLightbox() {
    document.getElementById('imageLightbox').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('lightboxImage').src = '';
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

  function buildContinueSection(projectId) {
    var recommendedIds = projectRecommendations[projectId] || [];
    if (!recommendedIds.length) return null;
    var section = document.createElement('div');
    section.className = 'case-continue';
    section.innerHTML = '<h3>Continue exploring</h3><div class="project-grid case-continue-grid"></div>';
    var grid = section.querySelector('.case-continue-grid');
    recommendedIds.forEach(function(id) {
      var project = projectCatalog[id];
      if (!project) return;
      var card = document.createElement('div');
      card.className = 'project-card ' + project.cardClass;
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.innerHTML = '' +
        '<img class="card-img" src="' + project.image + '" alt="' + project.title + '" loading="lazy">' +
        '<div class="card-body">' +
          '<div class="project-tag">' + project.tag + '</div>' +
          '<div class="project-title">' + project.title + '</div>' +
          '<div class="project-desc">' + project.desc + '</div>' +
        '</div>' +
        '<div class="project-arrow">↗</div>';
      card.addEventListener('click', function() { openDetail(id); });
      card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetail(id);
        }
      });
      grid.appendChild(card);
    });
    return section;
  }

  function injectDetailNav() {
    projectIds.forEach(function(projectId, index) {
      var detailView = document.getElementById('detail-' + projectId);
      if (!detailView) return;
      var backBtn = detailView.querySelector('.back-btn');
      if (!backBtn) return;
      var nextId = projectIds[(index + 1) % projectIds.length];
      var nav = document.createElement('div');
      nav.className = 'detail-nav';
      var back = document.createElement('button');
      back.type = 'button'; back.className = 'back-btn';
      back.textContent = '← back';
      back.addEventListener('click', function() { closeDetail(); });
      var next = document.createElement('button');
      next.type = 'button'; next.className = 'next-btn';
      next.textContent = 'next →';
      next.addEventListener('click', function() { openDetail(nextId); });
      nav.appendChild(back);
      nav.appendChild(next);
      backBtn.parentNode.replaceChild(nav, backBtn);
    });
  }

  function injectContinueSections() {
    projectIds.forEach(function(projectId) {
      var detailView = document.getElementById('detail-' + projectId);
      if (!detailView) return;
      var thanks = detailView.querySelector('.case-thanks');
      var section = buildContinueSection(projectId);
      if (!section) return;
      if (thanks) {
        thanks.parentNode.insertBefore(section, thanks);
      } else {
        detailView.appendChild(section);
      }
    });
  }

  function routeFromHash() {
    var slug = window.location.hash.replace('#','');
    if (slug === 'about') {
      openAbout(false);
      return;
    }
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
    if (slug === 'other') {
      switchTab('archive', false);
      return;
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
    var mobileNav = document.querySelector('.mobile-project-nav');
    if (mobileNav && !mobileNav.contains(event.target)) {
      closeMobileProjectMenu();
    }
    var mobileHeader = document.querySelector('.mobile-header-right');
    if (mobileHeader && !mobileHeader.contains(event.target)) {
      closeMobileBurger();
    }
  });
  window.addEventListener('resize', syncProjectTabMode);
  window.addEventListener('scroll', syncProjectTabMode, { passive: true });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeImageLightbox();
      closeAboutContactPopover();
    }
  });

  var formNextUrl = document.getElementById('formNextUrl');
  if (formNextUrl) {
    formNextUrl.value = window.location.origin + window.location.pathname + '#highlights';
  }
  document.querySelectorAll('.contact-form').forEach(function(contactForm) {
    var formNote = contactForm.nextElementSibling;
    var localNextField = contactForm.querySelector('input[name=\"_next\"]');
    if (localNextField && !localNextField.id) {
      localNextField.value = window.location.origin + window.location.pathname + '#about';
    }
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var submitButton = contactForm.querySelector('button[type="submit"]');
      var originalText = submitButton.textContent;
      if (formNote && formNote.classList.contains('form-note')) formNote.classList.remove('visible');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (!response.ok) throw new Error('Form submit failed');
        contactForm.reset();
        closeAboutContactPopover();
        showConfirmation();
      }).catch(function() {
        if (formNote && formNote.classList.contains('form-note')) formNote.classList.add('visible');
      }).finally(function() {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
    });
  });
  injectDetailNav();
  routeFromHash();
  syncProjectTabMode();
