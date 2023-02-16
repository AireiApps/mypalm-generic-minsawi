import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegregatenotificationmillstatusPage } from './segregatenotificationmillstatus.page';

describe('SegregatenotificationmillstatusPage', () => {
  let component: SegregatenotificationmillstatusPage;
  let fixture: ComponentFixture<SegregatenotificationmillstatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregatenotificationmillstatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegregatenotificationmillstatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
