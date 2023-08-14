import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoFinancialreportsHomePage } from './ceo-financialreports-home.page';

describe('CeoFinancialreportsHomePage', () => {
  let component: CeoFinancialreportsHomePage;
  let fixture: ComponentFixture<CeoFinancialreportsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoFinancialreportsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoFinancialreportsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
