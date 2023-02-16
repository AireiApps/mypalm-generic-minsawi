import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationHistoryscreenPage } from './notification-historyscreen.page';

describe('NotificationHistoryscreenPage', () => {
  let component: NotificationHistoryscreenPage;
  let fixture: ComponentFixture<NotificationHistoryscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationHistoryscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationHistoryscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
