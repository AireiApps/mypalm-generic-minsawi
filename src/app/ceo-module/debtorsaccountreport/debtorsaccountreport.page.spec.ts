import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DebtorsaccountreportPage } from './debtorsaccountreport.page';

describe('DebtorsaccountreportPage', () => {
  let component: DebtorsaccountreportPage;
  let fixture: ComponentFixture<DebtorsaccountreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorsaccountreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DebtorsaccountreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
