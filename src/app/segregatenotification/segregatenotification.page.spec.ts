import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegregatenotificationPage } from './segregatenotification.page';

describe('SegregatenotificationPage', () => {
  let component: SegregatenotificationPage;
  let fixture: ComponentFixture<SegregatenotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregatenotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegregatenotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
