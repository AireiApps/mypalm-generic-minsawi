import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoUseractivityMaintenancePage } from './ceo-useractivity-maintenance.page';

describe('CeoUseractivityMaintenancePage', () => {
  let component: CeoUseractivityMaintenancePage;
  let fixture: ComponentFixture<CeoUseractivityMaintenancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoUseractivityMaintenancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoUseractivityMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
