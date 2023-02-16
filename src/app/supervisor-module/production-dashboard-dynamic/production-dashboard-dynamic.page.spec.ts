import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionDashboardDynamicPage } from './production-dashboard-dynamic.page';

describe('ProductionDashboardDynamicPage', () => {
  let component: ProductionDashboardDynamicPage;
  let fixture: ComponentFixture<ProductionDashboardDynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDashboardDynamicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionDashboardDynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
