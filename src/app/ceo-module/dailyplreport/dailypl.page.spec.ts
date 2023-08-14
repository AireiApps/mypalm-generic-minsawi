import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyplPage } from './dailypl.page';

describe('DailyplPage', () => {
  let component: DailyplPage;
  let fixture: ComponentFixture<DailyplPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyplPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyplPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
