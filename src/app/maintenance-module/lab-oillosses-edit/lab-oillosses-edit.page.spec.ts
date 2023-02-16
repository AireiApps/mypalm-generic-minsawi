import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabOillossesEditPage } from './lab-oillosses-edit.page';

describe('LabOillossesEditPage', () => {
  let component: LabOillossesEditPage;
  let fixture: ComponentFixture<LabOillossesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabOillossesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabOillossesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
