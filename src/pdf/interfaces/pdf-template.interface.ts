export interface PdfTemplate {
  name: string;
  description: string;
  htmlContent: string;
  cssContent: string;
  sampleData: any;
  options?: PdfOptions;
}

export interface PdfOptions {
  format?: 'A4' | 'A3' | 'Letter';
  orientation?: 'portrait' | 'landscape';
  margins?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
}