import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlpressingstationAlertPage } from './production-hourlpressingstation-alert.page';

describe('ProductionHourlpressingstationAlertPage', () => {
  let component: ProductionHourlpressingstationAlertPage;
  let fixture: ComponentFixture<ProductionHourlpressingstationAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlpressingstationAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlpressingstationAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
