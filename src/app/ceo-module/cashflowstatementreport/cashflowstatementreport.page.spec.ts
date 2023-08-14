import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashflowstatementreportPage } from './cashflowstatementreport.page';

describe('CashflowstatementreportPage', () => {
  let component: CashflowstatementreportPage;
  let fixture: ComponentFixture<CashflowstatementreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashflowstatementreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashflowstatementreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
