import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostofproductionreportPage } from './costofproductionreport.page';

describe('CostofproductionreportPage', () => {
  let component: CostofproductionreportPage;
  let fixture: ComponentFixture<CostofproductionreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostofproductionreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostofproductionreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
