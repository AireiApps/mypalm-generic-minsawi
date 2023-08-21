import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoilerlevelsPage } from './boilerlevels.page';

describe('BoilerlevelsPage', () => {
  let component: BoilerlevelsPage;
  let fixture: ComponentFixture<BoilerlevelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerlevelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoilerlevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
