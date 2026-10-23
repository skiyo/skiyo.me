document.addEventListener('DOMContentLoaded', () => {
    (() => {
      const text = {
        en: {
          skip:'Skip to content', projects:'Projects', visit:'Visit',
          intro:"I'm an engineer interested in AI and emerging technologies. I enjoy research and exploration across different fields. This is my portfolio. Feel free to explore.",
          'agentsquared-tagline':'The Co-evolving Agent Network.',
          'agentsquared-desc':'AgentSquared (A2) is the co-evolving agent network where human-owned agents connect through A2A, chat through H2A, and sell their LLM, Skills, and Memory through APIs.',
          'dota-desc':'A 1v1 web battle game with Dota heroes, playable on desktop and mobile.',
          'pikoo-desc':'A real-time AI companion for the home, built on ESP32-S3. A physical agent powered by real-time large language models.',
          'wechat-title':'WeChat public account',
          qrAlt:'WeChat public account QR code', themeDark:'Switch to dark theme', themeLight:'Switch to light theme', navigation:'Main navigation', language:'Language',
          'painting-credit':'Oil painting by my son · All rights reserved.',
          paintingLabel:'Landscape oil painting', paintingAlt:"Oil painting of a flower-filled landscape beneath a colorful sky"
        },
        zh: {
          skip:'跳到正文', projects:'项目', visit:'访问',
          intro:'我是一位工程师，关注 AI 和前沿技术，喜欢在不同领域开展研究与探索。这里是我的作品集，欢迎随意看看。',
          'agentsquared-tagline':'共同进化的智能体网络。',
          'agentsquared-desc':'AgentSquared（A2）是一个共同进化的智能体网络：人类拥有的智能体通过 A2A 连接，通过 H2A 交流，并通过 API 出售其大模型（LLM）、技能（Skills）和记忆（Memory）能力。',
          'dota-desc':'基于 Dota 英雄的 1v1 网页对战，支持桌面和手机。',
          'pikoo-desc':'基于 ESP32-S3 的家庭实时 AI 伴侣。一款由实时大语言模型驱动的物理 Agent 智能设备。',
          'wechat-title':'微信公众号',
          qrAlt:'微信公众号二维码', themeDark:'切换为深色主题', themeLight:'切换为浅色主题', navigation:'主导航', language:'语言',
          'painting-credit':'油画创作：我的儿子 · 版权所有。',
          paintingLabel:'风景油画', paintingAlt:'风景油画：绚丽天空下的山野、房子与花田'
        }
      };
      let language = 'en';
      const root = document.documentElement;
      const themeButton = document.getElementById('theme-toggle');
      const wechatButton = document.getElementById('wechat-open');
      const wechatControl = document.querySelector('.wechat-control');
      const popover = document.getElementById('wechat-popover');
      const qr = document.getElementById('wechat-qr');
      const save = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
      function renderTheme() {
        const dark = root.dataset.theme === 'dark';
        themeButton.setAttribute('aria-pressed', String(dark));
        themeButton.setAttribute('aria-label', text[language][dark ? 'themeLight' : 'themeDark']);
        themeButton.title = themeButton.getAttribute('aria-label');
      }
      function setLanguage(value) {
        language = value === 'zh' ? 'zh' : 'en';
        root.lang = language === 'zh' ? 'zh-CN' : 'en';
        document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = text[language][el.dataset.i18n]);
        document.getElementById('lang-en').setAttribute('aria-pressed', String(language === 'en'));
        document.getElementById('lang-zh').setAttribute('aria-pressed', String(language === 'zh'));
        document.querySelector('.nav').setAttribute('aria-label', text[language].navigation);
        document.querySelector('.lang').setAttribute('aria-label', text[language].language);
        wechatButton.setAttribute('aria-label', text[language]['wechat-title']);
        wechatButton.title = text[language]['wechat-title'];
        document.getElementById('wechat-qr').alt = text[language].qrAlt;
        document.querySelector('.painting-panel').setAttribute('aria-label', text[language].paintingLabel);
        document.getElementById('landscape-painting').alt = text[language].paintingAlt;
        document.querySelectorAll('[data-project]').forEach(entry => {
          const name = entry.querySelector('h3').textContent;
          const websiteLabel = (language === 'zh' ? '访问 ' : 'Visit ') + name;
          const githubLabel = name + (language === 'zh' ? ' 的 GitHub' : ' on GitHub');
          entry.querySelectorAll('.project-link, .official-link').forEach(link => { link.setAttribute('aria-label', websiteLabel); link.title = websiteLabel; });
          const githubLink = entry.querySelector('.github-link');
          githubLink.setAttribute('aria-label', githubLabel); githubLink.title = githubLabel;
        });
        renderTheme();
      }
      document.getElementById('lang-en').addEventListener('click', () => { setLanguage('en'); save('skiyo-preview-language', 'en'); });
      document.getElementById('lang-zh').addEventListener('click', () => { setLanguage('zh'); save('skiyo-preview-language', 'zh'); });
      themeButton.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; save('skiyo-preview-theme', root.dataset.theme); renderTheme(); });
      let pinned = false;
      const mouseHover = matchMedia('(hover:hover) and (pointer:fine)');
      const positionPopover = () => {
        if (popover.hidden) return;
        const anchor = wechatControl.getBoundingClientRect();
        const left = Math.max(12 - anchor.left, Math.min(0, document.documentElement.clientWidth - 12 - anchor.left - popover.offsetWidth));
        popover.style.setProperty('--qr-left', left + 'px');
      };
      const showPopover = () => {
        popover.hidden = false;
        wechatButton.setAttribute('aria-expanded', 'true');
        positionPopover();
      };
      const hidePopover = () => {
        popover.hidden = true;
        wechatButton.setAttribute('aria-expanded', 'false');
      };
      wechatControl.addEventListener('pointerenter', () => { if (mouseHover.matches) showPopover(); });
      wechatControl.addEventListener('pointerleave', () => {
        if (mouseHover.matches && !pinned && !wechatButton.matches(':focus-visible')) hidePopover();
      });
      wechatControl.addEventListener('focusin', () => { if (wechatButton.matches(':focus-visible')) showPopover(); });
      wechatControl.addEventListener('focusout', event => {
        if (!wechatControl.contains(event.relatedTarget)) { pinned = false; hidePopover(); }
      });
      wechatButton.addEventListener('click', () => {
        pinned = !pinned;
        if (pinned) showPopover(); else hidePopover();
      });
      document.addEventListener('pointerdown', event => {
        if (!wechatControl.contains(event.target)) { pinned = false; hidePopover(); }
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !popover.hidden) {
          pinned = false; hidePopover(); event.preventDefault();
        }
      });
      window.addEventListener('resize', positionPopover);
      const fallbackQR = () => {
        if (!qr.dataset.fallback) return;
        qr.src = qr.dataset.fallback;
        delete qr.dataset.fallback;
      };
      qr.addEventListener('error', fallbackQR, { once:true });
      if (qr.complete && !qr.naturalWidth) fallbackQR();
      try { setLanguage(localStorage.getItem('skiyo-preview-language')); } catch (_) { setLanguage('en'); }
    })();

  const painting = document.getElementById('landscape-painting');
  const panel = document.querySelector('.painting-panel');
  const revealPainting = async () => {
    if (!painting.complete || painting.naturalWidth <= 1) return;
    const source = painting.currentSrc;
    try { await painting.decode(); } catch (_) { return; }
    if (painting.currentSrc === source) panel.classList.add('painting-ready');
  };
  painting.addEventListener('load', revealPainting);
  revealPainting();
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
});
