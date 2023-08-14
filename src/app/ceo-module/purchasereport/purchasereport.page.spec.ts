import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PurchasereportPage } from './purchasereport.page';

describe('PurchasereportPage', () => {
  let component: PurchasereportPage;
  let fixture: ComponentFixture<PurchasereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
