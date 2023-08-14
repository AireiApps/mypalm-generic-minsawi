import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoHourlyreportPage } from './ceo-hourlyreport.page';

describe('CeoHourlyreportPage', () => {
  let component: CeoHourlyreportPage;
  let fixture: ComponentFixture<CeoHourlyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoHourlyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoHourlyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
