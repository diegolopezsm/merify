// markdown-to-html.js

// Escapa HTML para evitar inyectar tags/JS
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Reemplazos inline (operan sobre texto ya escapado)
function inlineFormats(text: string) {
  // inline code: `code`
  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);

  // images: ![alt](url)
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_, alt, url) => `<img src="${url}" alt="${alt}" />`
  );

  // links: [text](url)
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text_: string, url: string) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${text_}</a>`
  );

  // bold **text** or __text__
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // italic *text* or _text_
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

  return text;
}

// Parser lineal que maneja bloques (codeblocks, lists, blockquotes, headings)
export function markdownToHtml(md: string) {
  if (!md) return '';

  // 1) Normalizamos saltos y escapamos todo (para seguridad)
  // Escapamos antes de insertar HTML generado por nosotros.
  const escaped = escapeHtml(md.replace(/\r\n/g, '\n'));

  const lines = escaped.split('\n');

  let html = '';
  let inCodeBlock = false;
  let codeBuffer = '';

  let listType: string | null = null; // 'ul' or 'ol'
  let listBuffer: string[] = [];

  let inBlockquote = false;
  let blockquoteBuffer: string[] = [];

  const flushParagraph = (p: string) => {
    if (p.trim() !== '') html += `<p>${inlineFormats(p)}</p>\n`;
  };

  const flushList = () => {
    if (!listType || listBuffer.length === 0) return;
    html += `<${listType}>\n`;
    for (const item of listBuffer) {
      html += `<li>${inlineFormats(item)}</li>\n`;
    }
    html += `</${listType}>\n`;
    listBuffer = [];
    listType = null;
  };

  const flushBlockquote = () => {
    if (!inBlockquote) return;
    html += `<blockquote>\n${blockquoteBuffer.join('\n')}\n</blockquote>\n`;
    blockquoteBuffer = [];
    inBlockquote = false;
  };

  let paragraphBuffer: string[] = [];

  const flushParagraphBuffer = () => {
    if (paragraphBuffer.length === 0) return;
    flushParagraph(paragraphBuffer.join(' '));
    paragraphBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // code block fence ```
    if (raw?.trim().startsWith('```')) {
      if (inCodeBlock) {
        // close
        html += `<pre><code>${codeBuffer}</code></pre>\n`;
        codeBuffer = '';
        inCodeBlock = false;
      } else {
        // open
        flushParagraphBuffer();
        flushList();
        flushBlockquote();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      // preservamos tal cual (ya escapado)
      codeBuffer += raw + '\n';
      continue;
    }

    // horizontal rule
    if (/^(\*\s*\*\s*\*|-{3,}|_{3,})\s*$/.test(raw || '')) {
      flushParagraphBuffer();
      flushList();
      flushBlockquote();
      html += '<hr />\n';
      continue;
    }

    // headings #.. up to ######
    const hMatch = raw?.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      flushParagraphBuffer();
      flushList();
      flushBlockquote();
      const level = hMatch[1]?.length || 0;
      const content = inlineFormats(hMatch[2]?.trim() || '');
      html += `<h${level}>${content}</h${level}>\n`;
      continue;
    }

    // blockquote > ...
    const bqMatch = raw?.match(/^\s*>\s?(.*)$/);
    if (bqMatch) {
      flushParagraphBuffer();
      flushList();
      inBlockquote = true;
      blockquoteBuffer.push(`<p>${inlineFormats(bqMatch[1] || '')}</p>`);
      continue;
    }

    // ordered list: "1. item"
    const olMatch = raw?.match(/^\s*\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraphBuffer();
      flushBlockquote();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listBuffer.push(olMatch[1] || '');
      continue;
    }

    // unordered list: "- item" or "* item" or "+ item"
    const ulMatch = raw?.match(/^\s*[-*+]\s+(.*)$/);
    if (ulMatch) {
      flushParagraphBuffer();
      flushBlockquote();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listBuffer.push(ulMatch[1] || '');
      continue;
    }

    // empty line -> flush paragraph / lists / blockquotes
    if (raw?.trim() === '') {
      flushParagraphBuffer();
      flushList();
      flushBlockquote();
      continue;
    }

    // normal paragraph line -> accumulate
    paragraphBuffer.push(raw?.trim() || '');
  }

  // fin de loop: flush todo
  flushParagraphBuffer();
  flushList();
  flushBlockquote();

  // Si quedo algún codeblock abierto, cerramos
  if (inCodeBlock) {
    html += `<pre><code>${escapeHtml(codeBuffer)}</code></pre>\n`;
  }

  return html;
}
