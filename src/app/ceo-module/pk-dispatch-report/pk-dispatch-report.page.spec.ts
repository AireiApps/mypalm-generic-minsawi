import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PkDispatchReportPage } from './pk-dispatch-report.page';

describe('PkDispatchReportPage', () => {
  let component: PkDispatchReportPage;
  let fixture: ComponentFixture<PkDispatchReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkDispatchReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PkDispatchReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
