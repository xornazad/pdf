import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPdfComponent } from './modify-pdf.component';

describe('ModifyPdfComponent', () => {
  let component: ModifyPdfComponent;
  let fixture: ComponentFixture<ModifyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
