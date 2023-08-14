import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingVehicleSearchNewPage } from './grading-vehicle-search-new.page';

describe('GradingVehicleSearchNewPage', () => {
  let component: GradingVehicleSearchNewPage;
  let fixture: ComponentFixture<GradingVehicleSearchNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingVehicleSearchNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingVehicleSearchNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
