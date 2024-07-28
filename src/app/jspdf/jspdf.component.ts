import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-jspdf',
  standalone: true,
  templateUrl: './jspdf.component.html',
  styleUrls: ['./jspdf.component.scss'] // corrected from styleUrl to styleUrls
})
export class JspdfComponent {
  name = 'Angular Html To Pdf ';

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;

    doc.html(pdfTable, {
      callback: (doc) => {
        doc.save('tableToPdf.pdf');
      },
      x: 10,
      y: 10
    });
  }
}
