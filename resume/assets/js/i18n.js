(function () {
  const LANG_KEY = 'resume_lang';
  const translations = {
    zh: {
      'title.role': '｜軟體工程師',
      'title.subtitle': 'Python · Web Full-Stack 學習者',
      'nav.about': '關於我',
      'nav.skills': '技能',
      'nav.experience': '工作經歷',
      'nav.education': '學歷',
      'nav.projects': '個人專案',
      'nav.notes': '學習筆記',
      'nav.contact': '聯絡',
      'actions.theme': '🌓 主題',
      'footer.updated': '最後更新：',
      'footer.copyright': '© Hsiao · 靜態部署於 GitHub Pages',
      'noscript': '請開啟 JavaScript 以瀏覽此頁面內容。'
    },
    en: {
      'title.role': '｜Software Engineer',
      'title.subtitle': 'Python · Web Full-Stack Learner',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.projects': 'Projects',
      'nav.notes': 'Notes',
      'nav.contact': 'Contact',
      'actions.theme': '🌓 Theme',
      'footer.updated': 'Last updated: ',
      'footer.copyright': '© Hsiao · Deployed on GitHub Pages',
      'noscript': 'Please enable JavaScript to view this page.'
    }
  };

  const meta = {
    zh: {
      lang: 'zh-Hant-TW',
      title: 'Hsiao Lin｜工程師 Resume',
      description: 'Hsiao Lin（工程師）的個人履歷：技能、經歷、專案與聯絡方式。',
      ogTitle: 'Hsiao Lin｜工程師 Resume',
      ogDescription: '技能、經歷、專案與聯絡方式。',
      jobTitle: '工程師'
    },
    en: {
      lang: 'en',
      title: 'Hsiao Lin | Software Engineer Resume',
      description: "Hsiao Lin's resume: skills, experience, projects, and contact information.",
      ogTitle: 'Hsiao Lin | Software Engineer Resume',
      ogDescription: 'Skills, experience, projects, and contact information.',
      jobTitle: 'Software Engineer'
    }
  };

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.zh;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

  function updateMeta(lang) {
    const info = meta[lang] || meta.zh;
    document.documentElement.lang = info.lang;
    document.title = info.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', info.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', info.ogTitle);
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', info.ogDescription);
    }

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        const data = JSON.parse(jsonLd.textContent);
        data.jobTitle = info.jobTitle;
        jsonLd.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        console.warn('Failed to update JSON-LD', error);
      }
    }
  }

  function updateLangToggle(lang) {
    const toggle = document.getElementById('langToggle');
    if (!toggle) return;
    const nextLang = lang === 'zh' ? 'en' : 'zh';
    toggle.textContent = nextLang === 'en' ? 'EN' : '中文';
    toggle.setAttribute('aria-label', nextLang === 'en' ? 'Switch to English' : '切換為中文');
  }

  function setLanguage(lang) {
    const normalized = lang === 'en' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, normalized);
    applyTranslations(normalized);
    updateMeta(normalized);
    updateLangToggle(normalized);
    if (typeof window.reloadRoute === 'function') {
      window.reloadRoute();
    }
  }

  function detectLanguage() {
    const languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    const normalized = languages.map((lang) => lang.toLowerCase());
    const prefersEnglish = normalized.some((lang) => lang.startsWith('en'));
    return prefersEnglish ? 'en' : 'zh';
  }

  function initI18n() {
    const stored = localStorage.getItem(LANG_KEY);
    const initial = stored || detectLanguage();
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = localStorage.getItem(LANG_KEY) || 'zh';
        setLanguage(current === 'zh' ? 'en' : 'zh');
      });
    }
    setLanguage(initial);
  }

  window.getLanguage = function () {
    return localStorage.getItem(LANG_KEY) || 'zh';
  };
  window.setLanguage = setLanguage;
  window.initI18n = initI18n;
})();
