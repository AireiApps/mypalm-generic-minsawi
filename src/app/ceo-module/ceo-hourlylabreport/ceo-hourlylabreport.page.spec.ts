import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoHourlylabreportPage } from './ceo-hourlylabreport.page';

describe('CeoHourlylabreportPage', () => {
  let component: CeoHourlylabreportPage;
  let fixture: ComponentFixture<CeoHourlylabreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoHourlylabreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoHourlylabreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
