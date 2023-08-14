import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoMachinerunninghoursreportPage } from './ceo-machinerunninghoursreport.page';

describe('CeoMachinerunninghoursreportPage', () => {
  let component: CeoMachinerunninghoursreportPage;
  let fixture: ComponentFixture<CeoMachinerunninghoursreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoMachinerunninghoursreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoMachinerunninghoursreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
