import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingVehicleSearchPage } from './grading-vehicle-search.page';

describe('GradingVehicleSearchPage', () => {
  let component: GradingVehicleSearchPage;
  let fixture: ComponentFixture<GradingVehicleSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingVehicleSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingVehicleSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
