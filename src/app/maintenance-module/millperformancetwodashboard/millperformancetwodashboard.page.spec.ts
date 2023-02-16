import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MillperformancetwodashboardPage } from './millperformancetwodashboard.page';

describe('MillperformancetwodashboardPage', () => {
  let component: MillperformancetwodashboardPage;
  let fixture: ComponentFixture<MillperformancetwodashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillperformancetwodashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MillperformancetwodashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
