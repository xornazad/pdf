import { Component } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Component({
  selector: 'app-modify-pdf',
  standalone: true,
  imports: [],
  templateUrl: './modify-pdf.component.html',
  styleUrl: './modify-pdf.component.scss'
})
export class ModifyPdfComponent {
  
  @Component({
    selector: 'app-modify-pdf',
    standalone: true,
    templateUrl: './modify-pdf.component.html',
    styleUrls: ['./modify-pdf.component.scss'] // corrected from styleUrl to styleUrls
  })
  name = 'Angular Modify PDF';
  
  async modifyPdf() {
    // Fetch the existing PDF document
    const existingPdfBytes = await fetch('/assets/example.pdf').then(res => res.arrayBuffer());

    // Load the existing PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the font
    const helveticaFont = await pdfDoc.embedFont(PDFDocument.StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText('Hello, world!', {
      x: 50,
      y: 450,
      size: 30,
      font: helveticaFont,
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
