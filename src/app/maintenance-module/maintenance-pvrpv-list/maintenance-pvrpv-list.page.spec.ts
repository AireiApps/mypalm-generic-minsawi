import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenancePvrpvListPage } from './maintenance-pvrpv-list.page';

describe('MaintenancePvrpvListPage', () => {
  let component: MaintenancePvrpvListPage;
  let fixture: ComponentFixture<MaintenancePvrpvListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePvrpvListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenancePvrpvListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
