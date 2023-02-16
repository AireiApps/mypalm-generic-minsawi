import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabOillossesreportPage } from './lab-oillossesreport.page';

describe('LabOillossesreportPage', () => {
  let component: LabOillossesreportPage;
  let fixture: ComponentFixture<LabOillossesreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabOillossesreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabOillossesreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
