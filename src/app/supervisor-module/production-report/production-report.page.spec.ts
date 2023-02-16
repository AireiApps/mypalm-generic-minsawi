import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionReportPage } from './production-report.page';

describe('ProductionReportPage', () => {
  let component: ProductionReportPage;
  let fixture: ComponentFixture<ProductionReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
