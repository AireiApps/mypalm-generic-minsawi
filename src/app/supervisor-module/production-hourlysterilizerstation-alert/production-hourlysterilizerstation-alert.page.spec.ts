import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlysterilizerstationAlertPage } from './production-hourlysterilizerstation-alert.page';

describe('ProductionHourlysterilizerstationAlertPage', () => {
  let component: ProductionHourlysterilizerstationAlertPage;
  let fixture: ComponentFixture<ProductionHourlysterilizerstationAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlysterilizerstationAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlysterilizerstationAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
