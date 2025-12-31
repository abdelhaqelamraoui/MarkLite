import { useRef, useEffect, useState, useCallback } from "react";

interface CodeEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function CodeEditor({ content, onChange }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });

    // Calculate line numbers
    const lines = content.split("\n");
    const lineCount = lines.length;

    const updateCursorPosition = useCallback(() => {
        if (!textareaRef.current) return;
        const { selectionStart } = textareaRef.current;
        const textBeforeCursor = content.substring(0, selectionStart);
        const linesBeforeCursor = textBeforeCursor.split("\n");
        const line = linesBeforeCursor.length;
        const col = linesBeforeCursor[linesBeforeCursor.length - 1].length + 1;
        setCursorPosition({ line, col });
    }, [content]);

    useEffect(() => {
        updateCursorPosition();
    }, [content, updateCursorPosition]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const handleKeyUp = () => {
        updateCursorPosition();
    };

    const handleClick = () => {
        updateCursorPosition();
    };

    // Syntax highlighting for markdown
    const highlightLine = (line: string, index: number): React.ReactNode => {
        // H1 headers
        if (line.startsWith("# ")) {
            return <span className="text-[#bd93f9] font-bold">{line}</span>;
        }
        // H2 headers
        if (line.startsWith("## ")) {
            return <span className="text-[#ff79c6] font-bold">{line}</span>;
        }
        // H3+ headers
        if (line.startsWith("### ") || line.startsWith("#### ")) {
            return <span className="text-[#8be9fd] font-semibold">{line}</span>;
        }
        // Code fence
        if (line.startsWith("```")) {
            return <span className="text-[#6272a4]">{line}</span>;
        }
        // List items
        if (line.match(/^[\s]*[-*+]\s/)) {
            return (
                <>
                    <span className="text-[#ff79c6]">{line.match(/^[\s]*[-*+]/)?.[0]}</span>
                    <span>{line.replace(/^[\s]*[-*+]/, "")}</span>
                </>
            );
        }
        // Numbered lists
        if (line.match(/^[\s]*\d+\.\s/)) {
            const match = line.match(/^([\s]*\d+\.)/);
            return (
                <>
                    <span className="text-[#ffb86c]">{match?.[0]}</span>
                    <span>{line.replace(/^[\s]*\d+\./, "")}</span>
                </>
            );
        }
        // Blockquote
        if (line.startsWith(">")) {
            return <span className="text-[#6272a4] italic">{line}</span>;
        }
        // Regular text - check for inline elements
        return highlightInline(line);
    };

    const highlightInline = (text: string): React.ReactNode => {
        // Simple inline highlighting for bold and links
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        // Bold **text**
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
            }
            parts.push(
                <span key={key++} className="text-[#ffb86c] font-bold">
                    {match[0]}
                </span>
            );
            lastIndex = match.index + match[0].length;
        }

        if (parts.length === 0) {
            return <span>{text}</span>;
        }

        if (lastIndex < text.length) {
            parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
        }

        return <>{parts}</>;
    };

    return (
        <main className="flex-1 flex overflow-hidden relative">
            {/* Line Numbers Gutter */}
            <div className="w-14 shrink-0 bg-[#111a22] border-r border-[#233648] flex flex-col items-end py-4 pr-3 no-select text-xs font-mono text-[#465a6e] overflow-hidden">
                {Array.from({ length: lineCount }, (_, i) => (
                    <div
                        key={i}
                        className={`leading-6 h-6 ${cursorPosition.line === i + 1
                                ? "text-[#f8f8f2] font-bold bg-[#137fec]/10 rounded px-1 -mr-1"
                                : ""
                            }`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-[#0d141c] overflow-hidden">
                {/* Highlighted Preview Layer */}
                <div className="absolute inset-0 p-4 font-mono text-sm leading-6 text-[#c9d1d9] pointer-events-none overflow-auto whitespace-pre-wrap break-words">
                    {lines.map((line, i) => (
                        <div key={i} className="min-h-[24px]">
                            {highlightLine(line, i)}
                        </div>
                    ))}
                </div>

                {/* Actual Textarea */}
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    onClick={handleClick}
                    spellCheck={false}
                    className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-[#bd93f9] resize-none outline-none overflow-auto"
                    style={{ caretColor: "#bd93f9" }}
                />
            </div>
        </main>
    );
}

export function getCursorPosition(content: string, selectionStart: number) {
    const textBeforeCursor = content.substring(0, selectionStart);
    const linesBeforeCursor = textBeforeCursor.split("\n");
    return {
        line: linesBeforeCursor.length,
        col: linesBeforeCursor[linesBeforeCursor.length - 1].length + 1,
    };
}
