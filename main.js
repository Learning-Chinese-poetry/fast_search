(function () {
  function setClipboard(text) {
    return new Promise((resolve, reject) => {
      try {
        navigator.clipboard.writeText(text).then(
          function (res) {
            resolve(res);
          },
          function (error) {
            reject(error);
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  function setStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function getStorage(key) {
    return localStorage.getItem(key);
  }

  function generateLink(q, addtion) {
    const q2 = addtion ? `+${addtion}` : '';
    return `https://www.google.com/search?q=${q}${q2}&oq=${q}${q2}`;
  }

  function splitLines(content) {
    return content
      .split('\n')
      .map(filterChar)
      .filter((v) => v);
  }

  function filterChar(text) {
    return text
      .trim()
      .replace(/^(\d+、*\.*)/, '')
      .replace(/\r|\n/, '');
  }

  function genDiv(text) {
    return `<div class="link-line"><span>${text}</span></div>`;
  }

  function createLinkNode(text, url) {
    return `<div class="link-line"><a href="${url}" target="_blank">${text}</a></div>`;
  }

  function createLinkNodes(content, addtion) {
    const lines = splitLines(content);
    const urls = lines.map((line) => generateLink(line, addtion));

    return urls.map((url, idx) => createLinkNode(idx + 1 + '、' + lines[idx].trim(), url)).join('');
  }

  const CONTENT_KEY = '__CONTENT__';
  const ADDTION_KEY = '__ADDTION_KEY__';
  const ndContent = document.getElementById('content-area');
  const ndAddtionKeyword = document.querySelector('.addtion-kw');
  const ndResult = document.getElementById('result');
  const ndCopyBtn = document.querySelector('.copy-links-btn');
  const ndClearBtn = document.querySelector('.clear-btn');
  const lastContent = getStorage(CONTENT_KEY) || '';
  const addtion = getStorage(ADDTION_KEY) || '';

  if (lastContent) {
    ndContent.value = lastContent;
    ndAddtionKeyword.value = addtion;

    ndResult.innerHTML = createLinkNodes(lastContent, addtion);
  }

  ndContent.addEventListener('input', (e) => {
    setStorage(CONTENT_KEY, e.target.value);
    ndResult.innerHTML = createLinkNodes(e.target.value, addtion);
  });

  ndAddtionKeyword.addEventListener('input', (e) => {
    setStorage(ADDTION_KEY, e.target.value);

    ndResult.innerHTML = createLinkNodes(ndContent.value, e.target.value);
  });

  ndCopyBtn.addEventListener('click', () => {
    const lines = splitLines(ndContent.value);
    const urls = lines.map((line) => generateLink(line, ndAddtionKeyword.value));

    console.log(urls.join('\r\n'));
    setClipboard(urls.join('\r\n')).then(
      () => {
        alert('复制成功');
      },
      () => {
        alert('复制失败');
      },
    );
  });

  function clear() {
    setStorage(CONTENT_KEY, '');
    setStorage(ADDTION_KEY, '');

    ndContent.value = '';
    ndAddtionKeyword.value = '';
    ndResult.innerHTML = '';
  }
  ndClearBtn.addEventListener('click', () => {
    clear();
  });
})();
