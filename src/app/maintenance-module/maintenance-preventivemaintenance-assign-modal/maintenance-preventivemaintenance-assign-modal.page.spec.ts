import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenancePreventivemaintenanceAssignModalPage } from './maintenance-preventivemaintenance-assign-modal.page';

describe('MaintenancePreventivemaintenanceAssignModalPage', () => {
  let component: MaintenancePreventivemaintenanceAssignModalPage;
  let fixture: ComponentFixture<MaintenancePreventivemaintenanceAssignModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePreventivemaintenanceAssignModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenancePreventivemaintenanceAssignModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
