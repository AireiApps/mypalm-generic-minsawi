import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceAcknowledgeModalPage } from './maintenance-acknowledge-modal.page';

describe('MaintenanceAcknowledgeModalPage', () => {
  let component: MaintenanceAcknowledgeModalPage;
  let fixture: ComponentFixture<MaintenanceAcknowledgeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceAcknowledgeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceAcknowledgeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
