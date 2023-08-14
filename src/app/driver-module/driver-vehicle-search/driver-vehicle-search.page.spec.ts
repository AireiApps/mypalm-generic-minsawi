import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverVehicleSearchPage } from './driver-vehicle-search.page';

describe('DriverVehicleSearchPage', () => {
  let component: DriverVehicleSearchPage;
  let fixture: ComponentFixture<DriverVehicleSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverVehicleSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverVehicleSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
