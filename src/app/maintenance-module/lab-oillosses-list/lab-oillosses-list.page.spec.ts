import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabOillossesListPage } from './lab-oillosses-list.page';

describe('LabOillossesListPage', () => {
  let component: LabOillossesListPage;
  let fixture: ComponentFixture<LabOillossesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabOillossesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabOillossesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
