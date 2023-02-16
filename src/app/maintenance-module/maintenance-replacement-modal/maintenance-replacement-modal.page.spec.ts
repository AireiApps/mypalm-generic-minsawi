import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceReplacementModalPage } from './maintenance-replacement-modal.page';

describe('MaintenanceReplacementModalPage', () => {
  let component: MaintenanceReplacementModalPage;
  let fixture: ComponentFixture<MaintenanceReplacementModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceReplacementModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceReplacementModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
