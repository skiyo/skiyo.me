    try { document.documentElement.dataset.theme = localStorage.getItem('skiyo-preview-theme') === 'dark' ? 'dark' : 'light'; } catch (_) {}

document.addEventListener('DOMContentLoaded', () => {
    (() => {
      const text = {
        en: {
          skip:'Skip to content', projects:'Projects', 'projects-sub':'a little building', visit:'Visit',
          intro:"My interests span many fields. Here are some of the things I've made — feel free to explore.",
          'agentsquared-tagline':'The Co-evolving Agent Network.',
          'agentsquared-desc':'AgentSquared (A2) is the co-evolving agent network where human-owned agents connect through A2A, chat through H2A, and sell their LLM, Skills, and Memory through APIs.',
          'dota-desc':'A 1v1 web battle game with Dota heroes, playable on desktop and mobile.',
          'pikoo-desc':'A real-time AI companion for the home, built on ESP32-S3. A physical agent powered by real-time large language models.',
          'wechat-title':'WeChat public account', 'wechat-description':'Scan with WeChat to follow the public account.',
          qrAlt:'WeChat public account QR code', themeDark:'Switch to dark theme', themeLight:'Switch to light theme', close:'Close dialog', navigation:'Main navigation', language:'Language',
          paintingLabel:'Oil painting by my son', paintingAlt:"My son's oil painting of a flower-filled landscape beneath a colorful sky"
        },
        zh: {
          skip:'跳到正文', projects:'项目', 'projects-sub':'动手做一点东西', visit:'访问',
          intro:'我的兴趣广泛，以下是我的一些作品，欢迎阅读参考。',
          'agentsquared-tagline':'共同进化的智能体网络。',
          'agentsquared-desc':'AgentSquared（A2）是一个共同进化的智能体网络：人类拥有的智能体通过 A2A 连接，通过 H2A 交流，并通过 API 出售其大模型（LLM）、技能（Skills）和记忆（Memory）能力。',
          'dota-desc':'基于 Dota 英雄的 1v1 网页对战，支持桌面和手机。',
          'pikoo-desc':'基于 ESP32-S3 的家庭实时 AI 伴侣。一款由实时大语言模型驱动的物理 Agent 智能设备。',
          'wechat-title':'微信公众号', 'wechat-description':'使用微信扫码，关注公众号。',
          qrAlt:'微信公众号二维码', themeDark:'切换为深色主题', themeLight:'切换为浅色主题', close:'关闭弹层', navigation:'主导航', language:'语言',
          paintingLabel:'儿子的油画', paintingAlt:'儿子画的油画：绚丽天空下的山野、房子与花田'
        }
      };
      let language = 'en';
      const root = document.documentElement;
      const themeButton = document.getElementById('theme-toggle');
      const wechatButton = document.getElementById('wechat-open');
      const dialog = document.getElementById('wechat-dialog');
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
        document.querySelector('[data-close]').setAttribute('aria-label', text[language].close);
        document.getElementById('wechat-qr').alt = text[language].qrAlt;
        document.querySelector('.painting-panel').setAttribute('aria-label', text[language].paintingLabel);
        document.getElementById('son-painting').alt = text[language].paintingAlt;
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
      wechatButton.addEventListener('click', () => dialog.showModal());
      dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      });
      try { setLanguage(localStorage.getItem('skiyo-preview-language')); } catch (_) { setLanguage('en'); }
    })();

  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
});
