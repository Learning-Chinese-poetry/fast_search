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

  function generateLink(q) {
    return `https://www.google.com/search?q=${q}&oq=${q}`;
  }

  function splitLines(content) {
    return content
      .split('\n')
      .filter((v) => v)
      .map(filterChar);
  }

  function filterChar(text) {
    return text.replace(/^(\d+、*\.*)/, '');
  }

  function genDiv(text) {
    return `<div class="link-line"><span>${text}</span></div>`;
  }

  function createLinkNode(text, url) {
    return `<div class="link-line"><a href="${url}" target="_blank">${text}</a></div>`;
  }

  const ndContent = document.getElementById('content-area');
  const ndResult = document.getElementById('result');
  const ndCopyBtn = document.querySelector('.copy-links');

  ndContent.addEventListener('input', (e) => {
    const lines = splitLines(e.target.value);
    const urls = lines.map((line) => generateLink(line));

    ndResult.innerHTML = urls.map((url, idx) => createLinkNode(idx + 1 + '、' + lines[idx].trim(), url)).join('');
  });

  ndCopyBtn.addEventListener('click', () => {
    const lines = splitLines(ndContent.value);
    const urls = lines.map((line) => generateLink(line));

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
})();
