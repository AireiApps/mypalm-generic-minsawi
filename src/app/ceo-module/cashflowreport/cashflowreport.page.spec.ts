import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashflowreportPage } from './cashflowreport.page';

describe('CashflowreportPage', () => {
  let component: CashflowreportPage;
  let fixture: ComponentFixture<CashflowreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashflowreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashflowreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
