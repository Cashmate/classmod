(function () {
  'use strict';
  if (new URLSearchParams(location.search).get('motd') !== '1') return;

  const target = document.getElementById('top');
  document.documentElement.classList.add('motd-mode');
  const quickstart = document.getElementById('quickstart');
  const intro = quickstart.firstElementChild;
  const instructions = quickstart.children[1];
  intro.classList.add('motd-intro');
  instructions.classList.add('motd-instructions');
  const alert = instructions.lastElementChild;
  alert.classList.add('motd-alert');
  quickstart.appendChild(alert);

  const roster = document.getElementById('roster');
  const heading = roster.firstElementChild;
  heading.lastElementChild.classList.add('motd-search');
  const titleBlock = heading.firstElementChild;
  const titleRow = document.createElement('div');
  titleRow.className = 'motd-roster-title';
  titleRow.appendChild(titleBlock.querySelector('h2'));
  titleRow.appendChild(document.getElementById('count'));
  titleBlock.prepend(titleRow);
  roster.querySelector('.htk-legend').parentElement.classList.add('motd-damage-legend');

  // Restore the whole roster even if a search was restored by the browser.
  const search = document.getElementById('search');
  search.value = '';
  search.dispatchEvent(new Event('input', { bubbles: true }));
  const cards = document.getElementById('cards');
  const entries = Array.from(cards.querySelectorAll('.wcard'));
  cards.replaceChildren();
  const base = Math.floor(entries.length / 3);
  const remainder = entries.length % 3;
  let offset = 0;
  for (let column = 0; column < 3; column++) {
    const group = document.createElement('div');
    group.className = 'flex flex-col gap-3';
    const length = base + (column < remainder ? 1 : 0);
    group.append(...entries.slice(offset, offset + length));
    cards.appendChild(group);
    offset += length;
  }

  const tools = document.createElement('aside');
  tools.className = 'motd-tools';
  const hasLocalIcons = entries.some(card => Array.from(card.querySelectorAll('.wcard-head img')).some(image => new URL(image.getAttribute('src'), document.baseURI).protocol === 'file:'));
  tools.innerHTML = '<button type="button" id="motd-save">' + (hasLocalIcons ? 'Choose weapon icons folder' : 'Export transparent PNG') + '</button>' +
    '<a href="' + location.pathname + '">Back to guide</a>' +
    '<span role="status" id="motd-progress">' + entries.length + ' classes from the current guide.</span>' +
    '<p>' + (hasLocalIcons ? 'Choose the img folder inside classmod first. The browser calls this “Upload”; the icons are read locally and are not sent to a server. ' : '') +
    'The dark preview background is excluded from the PNG. Export is 2× resolution.</p>';
  document.body.insertBefore(tools, target);
  const button = document.getElementById('motd-save');
  const progress = document.getElementById('motd-progress');
  const folderInput = document.createElement('input');
  folderInput.type = 'file';
  folderInput.setAttribute('webkitdirectory', '');
  folderInput.multiple = true;
  folderInput.hidden = true;
  tools.appendChild(folderInput);
  let localFiles = null;
  let libraryPromise;

  function blobURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read a weapon icon.'));
      reader.readAsDataURL(blob);
    });
  }

  function loadLibrary() {
    if (window.htmlToImage) return Promise.resolve(window.htmlToImage);
    if (!libraryPromise) libraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'motd-export-vendor.js';
      script.onload = () => resolve(window.htmlToImage);
      script.onerror = () => {
        libraryPromise = null;
        reject(new Error('Keep motd-export-vendor.js beside index.html, then retry.'));
      };
      document.head.appendChild(script);
    });
    return libraryPromise;
  }

  async function makeCapture() {
    if (document.fonts) await document.fonts.ready;
    const clone = target.cloneNode(true);
    Array.from(clone.children).forEach(section => {
      if (section.id !== 'quickstart' && section.id !== 'roster') section.remove();
    });
    clone.querySelectorAll('noscript, .expander, .chev, .sec-chev, .htk-legend, .motd-damage-legend, .motd-search, .motd-intro > div, [hidden]').forEach(node => node.remove());
    clone.style.margin = '0px';
    clone.style.transform = 'none';
    await Promise.all(Array.from(clone.querySelectorAll('img')).map(async image => {
      const url = new URL(image.getAttribute('src'), document.baseURI);
      if (url.protocol === 'data:') return;
      let blob;
      if (url.protocol === 'file:') {
        const relativePath = decodeURIComponent(url.pathname).split('/img/')[1];
        blob = localFiles && localFiles.get('img/' + relativePath);
        if (!blob) throw new Error('Choose the classmod folder containing img/' + relativePath + '.');
      } else {
        const response = await fetch(url.href);
        if (!response.ok) throw new Error('Could not load ' + url.pathname + '.');
        blob = await response.blob();
      }
      image.src = await blobURL(blob);
      image.removeAttribute('loading');
    }));
    return clone;
  }

  async function exportPNG() {
    button.disabled = true;
    progress.textContent = 'Preparing current classes and icons…';
    let staging;
    try {
      const library = await loadLibrary();
      const clone = await makeCapture();
      staging = document.createElement('div');
      staging.style.cssText = 'position:fixed;left:-20000px;top:0;pointer-events:none;';
      staging.appendChild(clone);
      document.body.appendChild(staging);
      await Promise.all(Array.from(clone.querySelectorAll('img')).map(image => image.decode()));
      const fontStyle = document.getElementById('motd-fonts');
      const fonts = fontStyle ? fontStyle.textContent : await library.getFontEmbedCSS(clone, { preferredFontFormat: 'woff2' });
      progress.textContent = 'Exporting transparent PNG…';
      const canvas = await library.toCanvas(clone, {
        pixelRatio: 2,
        backgroundColor: 'transparent',
        fontEmbedCSS: fonts,
        style: { margin: '0px', position: 'static', transform: 'none', colorScheme: 'only light' },
        filter: node => !(node instanceof Element) || (node.tagName !== 'NOSCRIPT' && getComputedStyle(node).display !== 'none')
      });
      if (canvas.getContext('2d').getImageData(0, 0, 1, 1).data[3] !== 0) throw new Error('The PNG background was unexpectedly opaque.');
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('The browser could not encode the PNG.');
      const file = new File([blob], 'motdpicfull.png', { type: 'image/png' });
      const url = URL.createObjectURL(file);
      const download = document.createElement('a');
      download.download = 'motdpicfull.png';
      download.type = 'image/png';
      download.href = url;
      download.hidden = true;
      document.body.appendChild(download);
      download.click();
      download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      progress.textContent = 'Downloaded ' + canvas.width + ' × ' + canvas.height + ' PNG with ' + clone.querySelectorAll('.wcard').length + ' classes.';
    } catch (error) {
      progress.textContent = 'Export failed: ' + error.message;
      console.error(error);
    } finally {
      if (staging) staging.remove();
      button.disabled = false;
    }
  }

  button.addEventListener('click', () => {
    const needsLocalIcons = Array.from(target.querySelectorAll('.wcard-head img')).some(image => new URL(image.getAttribute('src'), document.baseURI).protocol === 'file:');
    if (needsLocalIcons && !localFiles) {
      progress.textContent = 'Select classmod/img. This reads the icons locally; the PNG download follows.';
      folderInput.value = '';
      folderInput.click();
      return;
    }
    exportPNG();
  });
  folderInput.addEventListener('change', () => {
    if (!folderInput.files.length) return;
    localFiles = new Map();
    Array.from(folderInput.files).forEach(file => {
      const segments = file.webkitRelativePath.split('/');
      const relativePath = segments[0].toLowerCase() === 'img' ? segments.join('/') : segments.slice(1).join('/');
      // Only image contents are read; other selected files are ignored.
      if (/^img\/[^/]+\.png$/i.test(relativePath)) localFiles.set(relativePath, file);
    });
    if (!localFiles.size) {
      localFiles = null;
      progress.textContent = 'No PNG icons found. Choose the img folder inside classmod.';
      return;
    }
    button.textContent = 'Export transparent PNG';
    exportPNG();
  });

  // Small seam for checking capture contents independently of raster rendering.
  window.classmodMOTD = { makeCapture, exportPNG };
})();
