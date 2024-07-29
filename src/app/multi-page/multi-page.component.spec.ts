import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPageComponent } from './multi-page.component';

describe('MultiPageComponent', () => {
  let component: MultiPageComponent;
  let fixture: ComponentFixture<MultiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
