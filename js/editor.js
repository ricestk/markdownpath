// Live split editor: CodeMirror 6 (via ESM CDN) + marked preview
// Exports: mountEditor(hostEl, previewEl, initialMd) -> { setValue, getValue, destroy }

let CM = null;
let mdLang = null;
let marked = null;
let cmLoadPromise = null;

async function loadCm() {
  if (cmLoadPromise) return cmLoadPromise;
  cmLoadPromise = (async () => {
    try {
      const [cm, lang, mk] = await Promise.all([
        import('https://esm.sh/codemirror@6.0.1'),
        import('https://esm.sh/@codemirror/lang-markdown@6.2.5'),
        import('https://esm.sh/marked@12.0.2'),
      ]);
      CM = cm;
      mdLang = lang.markdown;
      marked = mk.marked;
      marked.setOptions({ gfm: true, breaks: false });
      return true;
    } catch (e) {
      console.warn('CodeMirror CDN failed, using textarea fallback', e);
      return false;
    }
  })();
  return cmLoadPromise;
}

// Simple sanitizer — strip <script>, on* attrs, javascript: URLs
function sanitize(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  tpl.content.querySelectorAll('script,style,iframe,object,embed').forEach(n => n.remove());
  tpl.content.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(a => {
      if (a.name.toLowerCase().startsWith('on')) el.removeAttribute(a.name);
      if ((a.name === 'href' || a.name === 'src') && /^\s*javascript:/i.test(a.value)) el.removeAttribute(a.name);
    });
  });
  return tpl.innerHTML;
}

function renderPreview(md, previewEl) {
  if (!marked) {
    previewEl.textContent = md;
    return;
  }
  try {
    const html = marked.parse(md || '');
    previewEl.innerHTML = sanitize(html);
    if (window.hljs) {
      previewEl.querySelectorAll('pre code').forEach(block => {
        try { window.hljs.highlightElement(block); } catch {}
      });
    }
  } catch (e) {
    previewEl.textContent = 'Error rendering: ' + e.message;
  }
}

export async function mountEditor(hostEl, previewEl, initialMd = '') {
  const loaded = await loadCm();
  let view = null;
  let textarea = null;
  let currentValue = initialMd;

  const onChange = (val) => {
    currentValue = val;
    renderPreview(val, previewEl);
  };

  if (loaded && CM) {
    const { EditorView, basicSetup } = CM;
    const updateListener = EditorView.updateListener.of((u) => {
      if (u.docChanged) onChange(u.state.doc.toString());
    });
    view = new EditorView({
      doc: initialMd,
      extensions: [basicSetup, mdLang(), updateListener, EditorView.lineWrapping],
      parent: hostEl,
    });
  } else {
    // Fallback textarea
    textarea = document.createElement('textarea');
    textarea.className = 'editor-fallback';
    textarea.value = initialMd;
    textarea.addEventListener('input', () => onChange(textarea.value));
    hostEl.appendChild(textarea);
  }

  // Initial render
  renderPreview(initialMd, previewEl);

  return {
    getValue: () => currentValue,
    setValue: (val) => {
      currentValue = val;
      if (view) {
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: val } });
      } else if (textarea) {
        textarea.value = val;
        renderPreview(val, previewEl);
      }
    },
    destroy: () => {
      if (view) view.destroy();
      if (textarea) textarea.remove();
    },
  };
}

// Renders a markdown snippet into an element (for examples tab)
export async function renderMd(md, targetEl) {
  await loadCm(); // ensures marked is loaded
  renderPreview(md, targetEl);
}
