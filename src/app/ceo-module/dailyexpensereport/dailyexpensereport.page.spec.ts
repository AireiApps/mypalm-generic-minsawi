import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyexpensereportPage } from './dailyexpensereport.page';

describe('DailyexpensereportPage', () => {
  let component: DailyexpensereportPage;
  let fixture: ComponentFixture<DailyexpensereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyexpensereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyexpensereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
