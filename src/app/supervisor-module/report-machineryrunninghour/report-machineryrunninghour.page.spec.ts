import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportMachineryrunninghourPage } from './report-machineryrunninghour.page';

describe('ReportMachineryrunninghourPage', () => {
  let component: ReportMachineryrunninghourPage;
  let fixture: ComponentFixture<ReportMachineryrunninghourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMachineryrunninghourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportMachineryrunninghourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
