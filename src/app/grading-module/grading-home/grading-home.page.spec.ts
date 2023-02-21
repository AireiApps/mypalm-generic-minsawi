import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingHomePage } from './grading-home.page';

describe('GradingHomePage', () => {
  let component: GradingHomePage;
  let fixture: ComponentFixture<GradingHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
