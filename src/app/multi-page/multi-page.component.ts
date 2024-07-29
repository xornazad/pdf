import { Component } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-multi-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './multi-page.component.html',
  styleUrls: ['./multi-page.component.scss']
})
export class MultiPageComponent {
  name = 'Angular Modify PDF';
  
  constructor(private http: HttpClient) {}

  async modifyPdf() {
    const apiData = await this.fetchApiData();

    const existingPdfBytes = await fetch('/assets/template.pdf').then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const firstPage = pdfDoc.getPage(0); // Assuming the template is the first page

    // Draw text on the first page
    // if (apiData.length > 0) {
    //   firstPage.drawText(apiData[0].title, {
    //     x: 50,
    //     y: 450,
    //     size: 20,
    //     color: rgb(0, 0.53, 0.71),
    //   });
    // }

    // Add remaining data to new pages
    for (let i = 1; i < apiData.length; i++) {
      const [templatePageClone] = await pdfDoc.copyPages(pdfDoc, [0]);
      pdfDoc.addPage(templatePageClone);
      templatePageClone.drawText(apiData[i].title, {
        x: 50,
        y: 350,
        size: 20,
        color: rgb(0, 0.53, 0.71),
      });
      pdfDoc.addPage(templatePageClone);
      templatePageClone.drawText(apiData[i].category, {
        x: 50,
        y: 655,
        size: 20,
        color: rgb(0, 0.53, 0.71),
      });
    }

    const pdfBytes = await pdfDoc.save();

    this.downloadPdf(pdfBytes);
  }

  private async fetchApiData(): Promise<any[]> {
    const apiUrl = 'https://fakestoreapi.com/products';
    return firstValueFrom(this.http.get<any[]>(apiUrl));
  }

  private downloadPdf(pdfBytes: Uint8Array) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
