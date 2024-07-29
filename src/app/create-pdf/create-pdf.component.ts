import { Component } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Component({
  selector: 'app-create-pdf',
  standalone: true,
  imports: [],
  templateUrl: './create-pdf.component.html',
  styleUrl: './create-pdf.component.scss'
})
export class CreatePdfComponent {
  name = 'Angular Modify PDF';
  
  async modifyPdf() {
    // Fetch the existing PDF document
    const existingPdfBytes = await fetch('/assets/template.pdf').then(res => res.arrayBuffer());

    // Load the existing PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the font
    // const helveticaFont = await pdfDoc.embedFont(PDFDocument.StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText('Hello, world!', {
      x: 70,
      y: 655,
      size: 15,
      // font: helveticaFont,
      color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDF document to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Convert the Uint8Array to a Blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the Blob and open it in a new window
    const url = URL.createObjectURL(blob);
    window.open(url);
  }
}
