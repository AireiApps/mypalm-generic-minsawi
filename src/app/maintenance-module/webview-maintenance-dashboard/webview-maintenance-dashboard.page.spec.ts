import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebviewMaintenanceDashboardPage } from './webview-maintenance-dashboard.page';

describe('WebviewMaintenanceDashboardPage', () => {
  let component: WebviewMaintenanceDashboardPage;
  let fixture: ComponentFixture<WebviewMaintenanceDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewMaintenanceDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebviewMaintenanceDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
