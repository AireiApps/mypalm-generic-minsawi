import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrialbalancereportPage } from './trialbalancereport.page';

describe('TrialbalancereportPage', () => {
  let component: TrialbalancereportPage;
  let fixture: ComponentFixture<TrialbalancereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialbalancereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrialbalancereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
