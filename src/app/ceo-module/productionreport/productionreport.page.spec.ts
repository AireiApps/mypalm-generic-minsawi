import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionreportPage } from './productionreport.page';

describe('ProductionreportPage', () => {
  let component: ProductionreportPage;
  let fixture: ComponentFixture<ProductionreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
