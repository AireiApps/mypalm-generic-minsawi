import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceForemanPvrpvListPage } from './maintenance-foreman-pvrpv-list.page';

describe('MaintenanceForemanPvrpvListPage', () => {
  let component: MaintenanceForemanPvrpvListPage;
  let fixture: ComponentFixture<MaintenanceForemanPvrpvListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceForemanPvrpvListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceForemanPvrpvListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
