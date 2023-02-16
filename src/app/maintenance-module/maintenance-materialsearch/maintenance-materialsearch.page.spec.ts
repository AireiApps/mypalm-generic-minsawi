import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceMaterialsearchPage } from './maintenance-materialsearch.page';

describe('MaintenanceMaterialsearchPage', () => {
  let component: MaintenanceMaterialsearchPage;
  let fixture: ComponentFixture<MaintenanceMaterialsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceMaterialsearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceMaterialsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
