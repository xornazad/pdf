import { Routes } from '@angular/router';
import { JspdfComponent } from './jspdf/jspdf.component';
import { CreatePdfComponent } from './create-pdf/create-pdf.component';
import { MultiPageComponent } from './multi-page/multi-page.component';

export const routes: Routes = [
    {
        path:"jspdf",component:JspdfComponent
        
    },
    {
        path:"create_pdf",component:CreatePdfComponent
        
    },
    {
        path:"multi_page",component:MultiPageComponent
        
    }
];
