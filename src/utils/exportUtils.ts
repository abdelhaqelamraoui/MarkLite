import { Theme, FontFamily, FontSize } from '../context/ThemeContext';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile, writeFile } from '@tauri-apps/plugin-fs';

// Theme color definitions for export
const themeColors: Record<Theme, Record<string, string>> = {
    dark: {
        bgPrimary: '#0a0a0a',
        bgSecondary: '#141414',
        textPrimary: '#ffffff',
        textSecondary: '#737373',
        border: '#262626',
        codeBg: '#141414',
        codeText: '#a3a3a3',
        blockquoteBg: 'rgba(20, 20, 20, 0.8)',
        accent: '#ffffff',
        syntaxH1: '#ffffff',
        syntaxH2: '#e5e5e5',
        syntaxH3: '#d4d4d4',
        syntaxLink: '#a3a3a3',
        syntaxBold: '#ffffff',
    },
    light: {
        bgPrimary: '#ffffff',
        bgSecondary: '#fafafa',
        textPrimary: '#171717',
        textSecondary: '#525252',
        border: '#e5e5e5',
        codeBg: '#f5f5f5',
        codeText: '#dc2626',
        blockquoteBg: 'rgba(250, 250, 250, 0.8)',
        accent: '#171717',
        syntaxH1: '#171717',
        syntaxH2: '#262626',
        syntaxH3: '#404040',
        syntaxLink: '#2563eb',
        syntaxBold: '#171717',
    },
    paper: {
        bgPrimary: '#f5f0e6',
        bgSecondary: '#ebe5d8',
        textPrimary: '#3d3d3d',
        textSecondary: '#6b6352',
        border: '#d4cfc2',
        codeBg: '#ebe5d8',
        codeText: '#8b5a2b',
        blockquoteBg: 'rgba(235, 229, 216, 0.6)',
        accent: '#5c4033',
        syntaxH1: '#3d3029',
        syntaxH2: '#5c4033',
        syntaxH3: '#6b5344',
        syntaxLink: '#2d5a7b',
        syntaxBold: '#5c4033',
    },
};

// Font family definitions
const fontFamilies: Record<FontFamily, string> = {
    'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    'merriweather': "'Merriweather', Georgia, 'Times New Roman', serif",
    'lora': "'Lora', Georgia, 'Times New Roman', serif",
    'source-serif': "'Source Serif 4', Georgia, 'Times New Roman', serif",
    'fira-sans': "'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Font size definitions
const fontSizes: Record<FontSize, { base: string; h1: string; h2: string; h3: string; lineHeight: string }> = {
    small: { base: '14px', h1: '1.875em', h2: '1.5em', h3: '1.125em', lineHeight: '1.6' },
    medium: { base: '16px', h1: '2.25em', h2: '1.75em', h3: '1.25em', lineHeight: '1.7' },
    large: { base: '18px', h1: '2.5em', h2: '2em', h3: '1.375em', lineHeight: '1.8' },
};

// Generate CSS for export
function generateExportCSS(theme: Theme, font: FontFamily, fontSize: FontSize): string {
    const colors = themeColors[theme];
    const fontFamily = fontFamilies[font];
    const sizes = fontSizes[fontSize];

    return `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:wght@400;700&family=Lora:wght@400;600;700&family=Source+Serif+4:wght@400;600;700&family=Fira+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${fontFamily};
            font-size: ${sizes.base};
            line-height: ${sizes.lineHeight};
            background-color: ${colors.bgPrimary};
            color: ${colors.textPrimary};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            padding: 3rem;
            max-width: 800px;
            margin: 0 auto;
        }

        @media print {
            body {
                padding: 0;
                background: white;
                color: #171717;
            }
        }

        h1 {
            font-size: ${sizes.h1};
            font-weight: 800;
            padding-bottom: 0.3em;
            border-bottom: 1px solid ${colors.border};
            color: ${colors.syntaxH1};
            margin-bottom: 1rem;
            margin-top: 0;
        }

        h2 {
            font-size: ${sizes.h2};
            font-weight: 700;
            padding-bottom: 0.3em;
            border-bottom: 1px solid ${colors.border};
            color: ${colors.syntaxH2};
            margin-top: 2rem;
            margin-bottom: 1rem;
        }

        h3 {
            font-size: ${sizes.h3};
            font-weight: 600;
            color: ${colors.syntaxH3};
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
        }

        h4, h5, h6 {
            font-weight: 600;
            color: ${colors.syntaxH3};
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
        }

        p {
            margin-bottom: 1rem;
        }

        a {
            color: ${colors.syntaxLink};
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        strong {
            font-weight: 600;
            color: ${colors.syntaxBold};
        }

        em {
            font-style: italic;
        }

        code {
            font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
            background: ${colors.codeBg};
            border: 1px solid ${colors.border};
            border-radius: 0.25rem;
            padding: 0.1em 0.3em;
            font-size: 0.875em;
            color: ${colors.codeText};
        }

        pre {
            background: ${colors.codeBg};
            border: 1px solid ${colors.border};
            border-radius: 0.375rem;
            padding: 1rem;
            overflow-x: auto;
            margin: 1rem 0;
        }

        pre code {
            background: none;
            border: none;
            padding: 0;
            color: ${colors.textPrimary};
            font-size: 0.9em;
        }

        ul, ol {
            padding-left: 1.5rem;
            margin-bottom: 1rem;
        }

        li {
            margin-bottom: 0.25rem;
        }

        li > ul, li > ol {
            margin-top: 0.25rem;
            margin-bottom: 0;
        }

        blockquote {
            border-left: 4px solid ${colors.accent};
            background: ${colors.blockquoteBg};
            padding: 0.5rem 1rem;
            margin: 1rem 0;
            font-style: italic;
            color: ${colors.textSecondary};
            border-radius: 0 0.25rem 0.25rem 0;
        }

        blockquote p:last-child {
            margin-bottom: 0;
        }

        hr {
            border: none;
            border-top: 1px solid ${colors.border};
            margin: 2rem 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }

        th, td {
            border: 1px solid ${colors.border};
            padding: 0.5rem 0.75rem;
            text-align: left;
        }

        th {
            background: ${colors.bgSecondary};
            font-weight: 600;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
            margin: 1rem 0;
        }

        /* Task lists */
        input[type="checkbox"] {
            margin-right: 0.5rem;
            transform: scale(1.1);
        }

        /* Syntax highlighting */
        .hljs-keyword { color: ${colors.syntaxH2}; }
        .hljs-string { color: ${colors.syntaxBold}; }
        .hljs-number { color: ${colors.syntaxH1}; }
        .hljs-function { color: #22c55e; }
        .hljs-comment { color: ${colors.textSecondary}; font-style: italic; }
        .hljs-title { color: #22c55e; }
        .hljs-params { color: ${colors.textSecondary}; }
        .hljs-built_in { color: ${colors.syntaxLink}; }
        .hljs-attr { color: #22c55e; }
        .hljs-literal { color: ${colors.syntaxH1}; }

        /* Footer */
        .export-footer {
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid ${colors.border};
            text-align: center;
            font-size: 0.75rem;
            color: ${colors.textSecondary};
        }
    `;
}

// Generate standalone HTML document
export function generateHTML(
    htmlContent: string,
    title: string,
    theme: Theme,
    font: FontFamily,
    fontSize: FontSize,
    includeFooter: boolean = true
): string {
    const css = generateExportCSS(theme, font, fontSize);
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const footer = includeFooter
        ? `<footer class="export-footer">Exported from MarkLite on ${date}</footer>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="MarkLite">
    <meta name="date" content="${new Date().toISOString()}">
    <title>${title}</title>
    <style>${css}</style>
</head>
<body>
    <article>
        ${htmlContent}
    </article>
    ${footer}
</body>
</html>`;
}

// Export to HTML file
export async function exportToHTML(
    htmlContent: string,
    fileName: string,
    theme: Theme,
    font: FontFamily,
    fontSize: FontSize
): Promise<void> {
    const title = fileName.replace(/\.(md|markdown)$/i, '');
    const fullHTML = generateHTML(htmlContent, title, theme, font, fontSize);

    // Use Tauri save dialog
    const filePath = await save({
        defaultPath: `${title}.html`,
        filters: [{ name: 'HTML', extensions: ['html'] }],
    });

    if (filePath) {
        await writeTextFile(filePath, fullHTML);
    }
}

// Export to PDF using html2pdf.js
export async function exportToPDF(
    htmlContent: string,
    fileName: string,
    theme: Theme,
    font: FontFamily,
    fontSize: FontSize
): Promise<void> {
    const title = fileName.replace(/\.(md|markdown)$/i, '');
    const colors = themeColors[theme];
    const fontFamily = fontFamilies[font];
    const sizes = fontSizes[fontSize];

    // Get save path first
    const filePath = await save({
        defaultPath: `${title}.pdf`,
        filters: [{ name: 'PDF', extensions: ['pdf'] }],
    });

    if (!filePath) return;

    // Dynamically import html2pdf
    const html2pdf = (await import('html2pdf.js')).default;

    // Create a styled container directly
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.cssText = `
        font-family: ${fontFamily};
        font-size: ${sizes.base};
        line-height: ${sizes.lineHeight};
        background-color: ${colors.bgPrimary};
        color: ${colors.textPrimary};
        padding: 40px;
        max-width: 800px;
        margin: 0 auto;
    `;
    
    // Apply styles to elements
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        h1 { font-size: ${sizes.h1}; font-weight: 800; color: ${colors.syntaxH1}; margin-bottom: 1rem; padding-bottom: 0.3em; border-bottom: 1px solid ${colors.border}; }
        h2 { font-size: ${sizes.h2}; font-weight: 700; color: ${colors.syntaxH2}; margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.3em; border-bottom: 1px solid ${colors.border}; }
        h3 { font-size: ${sizes.h3}; font-weight: 600; color: ${colors.syntaxH3}; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 1rem; }
        a { color: ${colors.syntaxLink}; text-decoration: none; }
        strong { font-weight: 600; color: ${colors.syntaxBold}; }
        code { background: ${colors.codeBg}; border: 1px solid ${colors.border}; border-radius: 4px; padding: 0.1em 0.3em; font-size: 0.875em; color: ${colors.codeText}; font-family: 'JetBrains Mono', monospace; }
        pre { background: ${colors.codeBg}; border: 1px solid ${colors.border}; border-radius: 6px; padding: 1rem; overflow-x: auto; margin: 1rem 0; }
        pre code { background: none; border: none; padding: 0; color: ${colors.textPrimary}; }
        ul, ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        li { margin-bottom: 0.25rem; }
        blockquote { border-left: 4px solid ${colors.accent}; background: ${colors.blockquoteBg}; padding: 0.5rem 1rem; margin: 1rem 0; font-style: italic; color: ${colors.textSecondary}; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { border: 1px solid ${colors.border}; padding: 0.5rem; text-align: left; }
        th { background: ${colors.bgSecondary}; font-weight: 600; }
        hr { border: none; border-top: 1px solid ${colors.border}; margin: 2rem 0; }
    `;
    container.prepend(styleElement);

    // Position off-screen for rendering
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    document.body.appendChild(container);

    // PDF options - output as blob
    const opt = {
        margin: [10, 10, 10, 10],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait' as const,
        },
    };

    try {
        // Generate PDF as blob and save to file
        const pdfBlob = await html2pdf().set(opt).from(container).output('blob') as Blob;
        const arrayBuffer = await pdfBlob.arrayBuffer();
        await writeFile(filePath, new Uint8Array(arrayBuffer));
    } finally {
        document.body.removeChild(container);
    }
}
