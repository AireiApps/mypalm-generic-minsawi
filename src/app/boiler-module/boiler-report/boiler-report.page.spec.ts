import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoilerReportPage } from './boiler-report.page';

describe('BoilerReportPage', () => {
  let component: BoilerReportPage;
  let fixture: ComponentFixture<BoilerReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoilerReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
