import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RampHomePage } from './ramp-home.page';

describe('RampHomePage', () => {
  let component: RampHomePage;
  let fixture: ComponentFixture<RampHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RampHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RampHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
