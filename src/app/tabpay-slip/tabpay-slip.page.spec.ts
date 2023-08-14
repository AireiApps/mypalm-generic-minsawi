import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabpaySlipPage } from './tabpay-slip.page';

describe('TabpaySlipPage', () => {
  let component: TabpaySlipPage;
  let fixture: ComponentFixture<TabpaySlipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabpaySlipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabpaySlipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
