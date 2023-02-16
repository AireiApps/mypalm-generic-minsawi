import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlypressingstationPage } from './production-hourlypressingstation.page';

describe('ProductionHourlypressingstationPage', () => {
  let component: ProductionHourlypressingstationPage;
  let fixture: ComponentFixture<ProductionHourlypressingstationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlypressingstationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlypressingstationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
