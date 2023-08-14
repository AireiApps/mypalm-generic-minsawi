import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PurchasemonthlyreportPage } from './purchasemonthlyreport.page';

describe('PurchasemonthlyreportPage', () => {
  let component: PurchasemonthlyreportPage;
  let fixture: ComponentFixture<PurchasemonthlyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasemonthlyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasemonthlyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
