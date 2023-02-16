import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionSterilizerpressHomePage } from './production-sterilizerpress-home.page';

describe('ProductionSterilizerpressHomePage', () => {
  let component: ProductionSterilizerpressHomePage;
  let fixture: ComponentFixture<ProductionSterilizerpressHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionSterilizerpressHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionSterilizerpressHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
