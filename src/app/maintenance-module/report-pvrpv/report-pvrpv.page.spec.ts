import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPvrpvPage } from './report-pvrpv.page';

describe('ReportPvrpvPage', () => {
  let component: ReportPvrpvPage;
  let fixture: ComponentFixture<ReportPvrpvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPvrpvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPvrpvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
