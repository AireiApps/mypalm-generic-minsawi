import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebviewProductionDashboardPage } from './webview-production-dashboard.page';

describe('WebviewProductionDashboardPage', () => {
  let component: WebviewProductionDashboardPage;
  let fixture: ComponentFixture<WebviewProductionDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewProductionDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebviewProductionDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
