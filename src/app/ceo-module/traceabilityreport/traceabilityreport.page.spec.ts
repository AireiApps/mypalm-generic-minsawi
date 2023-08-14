import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TraceabilityreportPage } from './traceabilityreport.page';

describe('TraceabilityreportPage', () => {
  let component: TraceabilityreportPage;
  let fixture: ComponentFixture<TraceabilityreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceabilityreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraceabilityreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
