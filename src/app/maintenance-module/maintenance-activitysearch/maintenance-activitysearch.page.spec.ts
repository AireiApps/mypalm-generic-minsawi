import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceActivitysearchPage } from './maintenance-activitysearch.page';

describe('MaintenanceActivitysearchPage', () => {
  let component: MaintenanceActivitysearchPage;
  let fixture: ComponentFixture<MaintenanceActivitysearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceActivitysearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceActivitysearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
