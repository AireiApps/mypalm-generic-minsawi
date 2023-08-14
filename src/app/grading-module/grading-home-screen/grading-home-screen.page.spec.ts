import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingHomeScreenPage } from './grading-home-screen.page';

describe('GradingHomeScreenPage', () => {
  let component: GradingHomeScreenPage;
  let fixture: ComponentFixture<GradingHomeScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingHomeScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingHomeScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
