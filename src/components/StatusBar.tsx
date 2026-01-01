interface StatusBarProps {
    isSaved: boolean;
    lineNumber: number;
    columnNumber: number;
    fileType?: string;
    showFileExplorer?: boolean;
    showTOC?: boolean;
    onToggleFileExplorer?: () => void;
    onToggleTOC?: () => void;
}

export function StatusBar({
    isSaved,
    lineNumber,
    columnNumber,
    fileType = "Markdown",
    showFileExplorer = false,
    showTOC = false,
    onToggleFileExplorer,
    onToggleTOC,
}: StatusBarProps) {
    return (
        <footer className="h-7 shrink-0 bg-[var(--bg-titlebar)] border-t border-[var(--border)] px-4 flex items-center justify-between text-[11px] font-medium tracking-wide text-[var(--text-secondary)] no-select transition-colors">
            <div className="flex items-center gap-1">
                {/* File Explorer Toggle */}
                <button
                    onClick={onToggleFileExplorer}
                    title="Files (Ctrl+Shift+E)"
                    className={`flex items-center justify-center w-6 h-5 rounded transition-colors ${showFileExplorer
                            ? "bg-[var(--accent)] text-[var(--accent-text)]"
                            : "hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                        }`}
                >
                    <span className="material-symbols-outlined text-[14px]">
                        folder_open
                    </span>
                </button>

                {/* TOC Toggle */}
                <button
                    onClick={onToggleTOC}
                    title="Table of Contents (Ctrl+Shift+O)"
                    className={`flex items-center justify-center w-6 h-5 rounded transition-colors ${showTOC
                            ? "bg-[var(--accent)] text-[var(--accent-text)]"
                            : "hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                        }`}
                >
                    <span className="material-symbols-outlined text-[14px]">
                        format_list_bulleted
                    </span>
                </button>

                {/* Separator */}
                <div className="w-[1px] h-3 bg-[var(--border)] mx-1.5"></div>

                {/* File Type */}
                <div className="hover:text-[var(--text-primary)] cursor-default transition-colors">
                    {fileType}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <span
                        className={`w-2 h-2 rounded-full ${isSaved
                            ? "bg-[var(--status-saved)] shadow-[0_0_4px_rgba(80,250,123,0.4)]"
                            : "bg-[var(--status-unsaved)] shadow-[0_0_4px_rgba(255,184,108,0.4)]"
                            }`}
                    ></span>
                    <span>{isSaved ? "Saved" : "Unsaved"}</span>
                </div>
                <div className="hover:text-[var(--text-primary)] cursor-default transition-colors">
                    Ln {lineNumber}, Col {columnNumber}
                </div>
                <div className="hover:text-[var(--text-primary)] cursor-default transition-colors">
                    UTF-8
                </div>
            </div>
        </footer>
    );
}
