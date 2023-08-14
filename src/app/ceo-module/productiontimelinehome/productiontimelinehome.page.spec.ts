import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductiontimelinehomePage } from './productiontimelinehome.page';

describe('ProductiontimelinehomePage', () => {
  let component: ProductiontimelinehomePage;
  let fixture: ComponentFixture<ProductiontimelinehomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductiontimelinehomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductiontimelinehomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
