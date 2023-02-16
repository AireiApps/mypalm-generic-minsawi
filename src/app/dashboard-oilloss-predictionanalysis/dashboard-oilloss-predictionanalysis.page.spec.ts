import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardOillossPredictionanalysisPage } from './dashboard-oilloss-predictionanalysis.page';

describe('DashboardOillossPredictionanalysisPage', () => {
  let component: DashboardOillossPredictionanalysisPage;
  let fixture: ComponentFixture<DashboardOillossPredictionanalysisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOillossPredictionanalysisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardOillossPredictionanalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
