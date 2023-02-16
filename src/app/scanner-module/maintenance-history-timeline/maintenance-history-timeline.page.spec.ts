import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceHistoryTimelinePage } from './maintenance-history-timeline.page';

describe('MaintenanceHistoryTimelinePage', () => {
  let component: MaintenanceHistoryTimelinePage;
  let fixture: ComponentFixture<MaintenanceHistoryTimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceHistoryTimelinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceHistoryTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
