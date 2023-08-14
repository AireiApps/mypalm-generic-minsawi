import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoDailyreportsPage } from './ceo-dailyreports.page';

describe('CeoDailyreportsPage', () => {
  let component: CeoDailyreportsPage;
  let fixture: ComponentFixture<CeoDailyreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoDailyreportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoDailyreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
