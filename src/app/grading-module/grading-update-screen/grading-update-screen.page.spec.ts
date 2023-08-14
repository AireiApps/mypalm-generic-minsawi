import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingUpdateScreenPage } from './grading-update-screen.page';

describe('GradingUpdateScreenPage', () => {
  let component: GradingUpdateScreenPage;
  let fixture: ComponentFixture<GradingUpdateScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingUpdateScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingUpdateScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
