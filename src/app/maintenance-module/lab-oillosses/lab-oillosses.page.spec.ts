import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabOillossesPage } from './lab-oillosses.page';

describe('LabOillossesPage', () => {
  let component: LabOillossesPage;
  let fixture: ComponentFixture<LabOillossesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabOillossesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabOillossesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
