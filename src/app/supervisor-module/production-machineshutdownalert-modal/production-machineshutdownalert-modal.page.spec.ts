import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionMachineshutdownalertModalPage } from './production-machineshutdownalert-modal.page';

describe('ProductionMachineshutdownalertModalPage', () => {
  let component: ProductionMachineshutdownalertModalPage;
  let fixture: ComponentFixture<ProductionMachineshutdownalertModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionMachineshutdownalertModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionMachineshutdownalertModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
