import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHomePage } from './production-home.page';

describe('ProductionHomePage', () => {
  let component: ProductionHomePage;
  let fixture: ComponentFixture<ProductionHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
