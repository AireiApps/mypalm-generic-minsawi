import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlysterilizerstationsavePage } from './production-hourlysterilizerstationsave.page';

describe('ProductionHourlysterilizerstationsavePage', () => {
  let component: ProductionHourlysterilizerstationsavePage;
  let fixture: ComponentFixture<ProductionHourlysterilizerstationsavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlysterilizerstationsavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlysterilizerstationsavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
