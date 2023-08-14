import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfitandlossPage } from './profitandloss.page';

describe('ProfitandlossPage', () => {
  let component: ProfitandlossPage;
  let fixture: ComponentFixture<ProfitandlossPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitandlossPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfitandlossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
