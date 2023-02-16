import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceRewardpointsPage } from './maintenance-rewardpoints.page';

describe('MaintenanceRewardpointsPage', () => {
  let component: MaintenanceRewardpointsPage;
  let fixture: ComponentFixture<MaintenanceRewardpointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceRewardpointsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceRewardpointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
