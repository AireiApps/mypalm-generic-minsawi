import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPredictionanalysisPage } from './dashboard-predictionanalysis.page';

describe('DashboardPredictionanalysisPage', () => {
  let component: DashboardPredictionanalysisPage;
  let fixture: ComponentFixture<DashboardPredictionanalysisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPredictionanalysisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPredictionanalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
