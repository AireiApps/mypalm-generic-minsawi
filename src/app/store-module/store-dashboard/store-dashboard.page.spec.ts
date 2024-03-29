import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreDashboardPage } from './store-dashboard.page';

describe('StoreDashboardPage', () => {
  let component: StoreDashboardPage;
  let fixture: ComponentFixture<StoreDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
