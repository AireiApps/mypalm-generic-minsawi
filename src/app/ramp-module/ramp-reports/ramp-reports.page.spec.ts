import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RampReportsPage } from './ramp-reports.page';

describe('RampReportsPage', () => {
  let component: RampReportsPage;
  let fixture: ComponentFixture<RampReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RampReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RampReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
