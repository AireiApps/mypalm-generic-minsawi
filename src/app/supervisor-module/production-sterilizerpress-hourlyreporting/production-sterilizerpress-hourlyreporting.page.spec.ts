import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionSterilizerpressHourlyreportingPage } from './production-sterilizerpress-hourlyreporting.page';

describe('ProductionSterilizerpressHourlyreportingPage', () => {
  let component: ProductionSterilizerpressHourlyreportingPage;
  let fixture: ComponentFixture<ProductionSterilizerpressHourlyreportingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionSterilizerpressHourlyreportingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionSterilizerpressHourlyreportingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
