import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownPreviewProps {
    content: string;
    fileName: string;
    lineCount: number;
    fileSize: number;
    onEditClick: () => void;
}

export function MarkdownPreview({
    content,
    fileName,
    lineCount,
    fileSize,
    onEditClick,
}: MarkdownPreviewProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <main className="flex-1 overflow-y-auto relative flex justify-center w-full">
            <div className="flex flex-col max-w-[900px] w-full my-8 mx-4 md:mx-0">
                <div className="bg-[#282a36] text-[#f8f8f2] rounded-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-[#44475a] overflow-hidden min-h-[calc(100vh-12rem)]">
                    {/* File Header */}
                    <div className="bg-[#21222c] border-b border-[#44475a] px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-mono text-[#6272a4]">
                            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                            <span>{lineCount} lines</span>
                            <span className="opacity-30">|</span>
                            <span>{formatFileSize(fileSize)}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={onEditClick}
                                className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border border-[#44475a] hover:bg-[#44475a] text-[#f8f8f2] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Markdown Content */}
                    <div className="markdown-body p-8 md:p-12">
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                            {content}
                        </Markdown>
                    </div>
                </div>
                <div className="h-20 w-full"></div>
            </div>
        </main>
    );
}
