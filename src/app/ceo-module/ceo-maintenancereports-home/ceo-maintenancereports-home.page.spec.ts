import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoMaintenancereportsHomePage } from './ceo-maintenancereports-home.page';

describe('CeoMaintenancereportsHomePage', () => {
  let component: CeoMaintenancereportsHomePage;
  let fixture: ComponentFixture<CeoMaintenancereportsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoMaintenancereportsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoMaintenancereportsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
