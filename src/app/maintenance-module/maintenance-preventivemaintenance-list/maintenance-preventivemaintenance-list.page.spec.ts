import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenancePreventivemaintenanceListPage } from './maintenance-preventivemaintenance-list.page';

describe('MaintenancePreventivemaintenanceListPage', () => {
  let component: MaintenancePreventivemaintenanceListPage;
  let fixture: ComponentFixture<MaintenancePreventivemaintenanceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePreventivemaintenanceListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenancePreventivemaintenanceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
