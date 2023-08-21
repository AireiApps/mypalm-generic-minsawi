import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoilerLogHomePage } from './boiler-log-home.page';

describe('BoilerLogHomePage', () => {
  let component: BoilerLogHomePage;
  let fixture: ComponentFixture<BoilerLogHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerLogHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoilerLogHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
