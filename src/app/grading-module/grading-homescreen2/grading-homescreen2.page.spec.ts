import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingHomescreen2Page } from './grading-homescreen2.page';

describe('GradingHomescreen2Page', () => {
  let component: GradingHomescreen2Page;
  let fixture: ComponentFixture<GradingHomescreen2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingHomescreen2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingHomescreen2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
