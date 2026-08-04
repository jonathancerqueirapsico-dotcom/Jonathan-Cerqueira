(() => {
  const body = document.body;
  const guideToggle = document.querySelector('.guide-toggle');
  const themeSwitch = document.querySelector('.theme-switch');
  const prompt = document.querySelector('.constellation-prompt');
  const nodes = [...document.querySelectorAll('.star-node')];
  const soundToggle = document.querySelector('.sound-toggle');

  const savedTheme = localStorage.getItem('jc-theme');
  if (savedTheme === 'dark') {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    if (themeSwitch) {
      themeSwitch.textContent = '☾ ESCURO';
      themeSwitch.setAttribute('aria-pressed', 'true');
    }
  }

  guideToggle?.addEventListener('click', () => {
    const collapsed = body.classList.toggle('guide-collapsed');
    guideToggle.setAttribute('aria-expanded', String(!collapsed));
    guideToggle.setAttribute('aria-label', collapsed ? 'Expandir guia' : 'Recolher guia');
    guideToggle.textContent = collapsed ? '→' : '← RECOLHER GUIA';
  });

  themeSwitch?.addEventListener('click', () => {
    const dark = !body.classList.contains('theme-dark');
    body.classList.toggle('theme-dark', dark);
    body.classList.toggle('theme-light', !dark);
    themeSwitch.textContent = dark ? '☾ ESCURO' : '☀ CLARO';
    themeSwitch.setAttribute('aria-pressed', String(dark));
    localStorage.setItem('jc-theme', dark ? 'dark' : 'light');
  });

  function selectNode(node) {
    nodes.forEach((item) => {
      item.classList.toggle('active', item === node);
      item.setAttribute('aria-pressed', String(item === node));
    });
    if (prompt) {
      const text = node.getAttribute('aria-label') || 'Selecione um ponto da constelação';
      prompt.innerHTML = `<span></span>${text}`;
    }
  }

  nodes.forEach((node) => {
    node.addEventListener('click', () => selectNode(node));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectNode(node);
      }
    });
  });

  const initialNode = nodes.find((node) => (node.getAttribute('aria-label') || '').startsWith('Integração'));
  if (initialNode) selectNode(initialNode);

  let audioContext = null;
  let masterGain = null;
  let active = false;

  function startAmbience() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioContext = audioContext || new AudioContext();
    masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 1.5);
    masterGain.connect(audioContext.destination);

    [174.61, 261.63, 392].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.13 / (index + 1);
      lfo.frequency.value = 0.045 + index * 0.017;
      lfoGain.gain.value = 5 + index * 2;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start();
      lfo.start();
    });
    active = true;
  }

  function stopAmbience() {
    if (masterGain && audioContext) {
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), audioContext.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
      setTimeout(() => audioContext?.close(), 900);
    }
    audioContext = null;
    masterGain = null;
    active = false;
  }

  soundToggle?.addEventListener('click', () => {
    if (active) stopAmbience();
    else startAmbience();
    soundToggle.setAttribute('aria-pressed', String(active));
    soundToggle.innerHTML = active
      ? '<span aria-hidden="true">◖)</span> PAUSAR PAISAGEM'
      : '<span aria-hidden="true">◖)</span> OUVIR PAISAGEM';
  });
})();
