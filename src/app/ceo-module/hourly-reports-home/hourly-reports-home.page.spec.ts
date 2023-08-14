import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HourlyReportsHomePage } from './hourly-reports-home.page';

describe('HourlyReportsHomePage', () => {
  let component: HourlyReportsHomePage;
  let fixture: ComponentFixture<HourlyReportsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyReportsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyReportsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
