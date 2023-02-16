import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionSterilizerpressDashboardPage } from './production-sterilizerpress-dashboard.page';

describe('ProductionSterilizerpressDashboardPage', () => {
  let component: ProductionSterilizerpressDashboardPage;
  let fixture: ComponentFixture<ProductionSterilizerpressDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionSterilizerpressDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionSterilizerpressDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
