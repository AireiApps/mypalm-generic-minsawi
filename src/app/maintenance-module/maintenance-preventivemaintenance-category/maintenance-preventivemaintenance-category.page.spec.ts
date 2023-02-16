import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenancePreventivemaintenanceCategoryPage } from './maintenance-preventivemaintenance-category.page';

describe('MaintenancePreventivemaintenanceCategoryPage', () => {
  let component: MaintenancePreventivemaintenanceCategoryPage;
  let fixture: ComponentFixture<MaintenancePreventivemaintenanceCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePreventivemaintenanceCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenancePreventivemaintenanceCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
