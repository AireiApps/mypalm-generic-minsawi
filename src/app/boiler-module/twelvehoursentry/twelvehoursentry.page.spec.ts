import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwelvehoursentryPage } from './twelvehoursentry.page';

describe('TwelvehoursentryPage', () => {
  let component: TwelvehoursentryPage;
  let fixture: ComponentFixture<TwelvehoursentryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwelvehoursentryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwelvehoursentryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
