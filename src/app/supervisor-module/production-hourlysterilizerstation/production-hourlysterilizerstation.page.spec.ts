import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlysterilizerstationPage } from './production-hourlysterilizerstation.page';

describe('ProductionHourlysterilizerstationPage', () => {
  let component: ProductionHourlysterilizerstationPage;
  let fixture: ComponentFixture<ProductionHourlysterilizerstationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlysterilizerstationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlysterilizerstationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
