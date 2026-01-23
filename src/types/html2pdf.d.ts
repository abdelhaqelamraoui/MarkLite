declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | number[];
        filename?: string;
        image?: {
            type?: string;
            quality?: number;
        };
        enableLinks?: boolean;
        html2canvas?: {
            scale?: number;
            useCORS?: boolean;
            logging?: boolean;
            letterRendering?: boolean;
            allowTaint?: boolean;
            backgroundColor?: string;
        };
        jsPDF?: {
            unit?: string;
            format?: string | [number, number];
            orientation?: 'portrait' | 'landscape';
            compress?: boolean;
        };
        pagebreak?: {
            mode?: string | string[];
            before?: string | string[];
            after?: string | string[];
            avoid?: string | string[];
        };
    }

    interface Html2PdfWorker {
        set(options: Html2PdfOptions): Html2PdfWorker;
        from(element: HTMLElement | string): Html2PdfWorker;
        save(): Promise<void>;
        output(type: string, options?: unknown): Promise<unknown>;
        then(callback: (pdf: unknown) => void): Html2PdfWorker;
        toPdf(): Html2PdfWorker;
    }

    function html2pdf(): Html2PdfWorker;
    function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2PdfWorker;

    export = html2pdf;
}
