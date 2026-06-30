import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvReport } from './csv-report';

describe('CsvReport', () => {
  let component: CsvReport;
  let fixture: ComponentFixture<CsvReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
