import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionDashboardPage } from './production-dashboard.page';

describe('ProductionDashboardPage', () => {
  let component: ProductionDashboardPage;
  let fixture: ComponentFixture<ProductionDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
