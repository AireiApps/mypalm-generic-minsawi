import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverSupplierSearchPage } from './driver-supplier-search.page';

describe('DriverSupplierSearchPage', () => {
  let component: DriverSupplierSearchPage;
  let fixture: ComponentFixture<DriverSupplierSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSupplierSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverSupplierSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
