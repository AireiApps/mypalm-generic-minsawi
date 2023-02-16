import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardForecastingPage } from './dashboard-forecasting.page';

describe('DashboardForecastingPage', () => {
  let component: DashboardForecastingPage;
  let fixture: ComponentFixture<DashboardForecastingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardForecastingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardForecastingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
