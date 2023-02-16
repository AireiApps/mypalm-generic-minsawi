import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionHourlypressingstationsavePage } from './production-hourlypressingstationsave.page';

describe('ProductionHourlypressingstationsavePage', () => {
  let component: ProductionHourlypressingstationsavePage;
  let fixture: ComponentFixture<ProductionHourlypressingstationsavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHourlypressingstationsavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionHourlypressingstationsavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
