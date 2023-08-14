import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetcomparereportPage } from './budgetcomparereport.page';

describe('BudgetcomparereportPage', () => {
  let component: BudgetcomparereportPage;
  let fixture: ComponentFixture<BudgetcomparereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetcomparereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetcomparereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
