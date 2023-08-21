import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwohoursentryPage } from './twohoursentry.page';

describe('TwohoursentryPage', () => {
  let component: TwohoursentryPage;
  let fixture: ComponentFixture<TwohoursentryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwohoursentryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwohoursentryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
