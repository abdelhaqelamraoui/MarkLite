interface WelcomeScreenProps {
    onOpenFile: () => void;
    onFileDrop: (path: string) => void;
}

export function WelcomeScreen({ onOpenFile, onFileDrop }: WelcomeScreenProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the file path from the drop event
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            // For Tauri, we need to use the path property
            // @ts-expect-error - Tauri adds path to File objects
            const path = file.path || file.name;
            if (path.endsWith('.md') || path.endsWith('.markdown')) {
                onFileDrop(path);
            }
        }
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative w-full h-full">
            <div className="w-full max-w-2xl flex flex-col items-center">
                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="group relative w-full flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-[#44475a] bg-[#282a36]/30 px-10 py-20 transition-all duration-300 hover:border-[#bd93f9]/60 hover:bg-[#bd93f9]/[0.02] cursor-default"
                >
                    {/* Hero Icon */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#21222c] shadow-sm ring-1 ring-[#44475a] group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                        <span className="material-symbols-outlined text-4xl text-[#6272a4] group-hover:text-[#bd93f9] transition-colors duration-300">
                            upload_file
                        </span>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col items-center gap-2 text-center max-w-md z-10">
                        <h1 className="text-2xl font-bold tracking-tight text-[#f8f8f2]">
                            Open a file to start writing
                        </h1>
                        <p className="text-[#6272a4] text-sm font-medium">
                            Drag and drop any <code className="bg-[#44475a] px-1.5 py-0.5 rounded text-xs mx-1 text-[#8be9fd]">.md</code> file here
                        </p>
                    </div>

                    {/* Primary Action Button */}
                    <button
                        onClick={onOpenFile}
                        className="mt-4 flex items-center justify-center gap-2 bg-[#bd93f9] hover:bg-[#bd93f9]/90 text-[#282a36] font-semibold text-sm px-6 py-2.5 rounded-lg shadow-lg shadow-[#bd93f9]/20 transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:ring-offset-2 focus:ring-offset-[#21222c]"
                    >
                        <span className="material-symbols-outlined text-[20px]">folder_open</span>
                        <span>Open File</span>
                    </button>

                    {/* Subtle visual hint for dragging */}
                    <div className="absolute inset-0 rounded-xl bg-[#bd93f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Version Footer */}
                <div className="mt-8 text-center">
                    <p className="text-[#6272a4] text-xs font-medium font-mono">v0.1.0</p>
                </div>
            </div>
        </main>
    );
}
