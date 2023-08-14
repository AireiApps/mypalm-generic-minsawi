import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoUseractivityHomePage } from './ceo-useractivity-home.page';

describe('CeoUseractivityHomePage', () => {
  let component: CeoUseractivityHomePage;
  let fixture: ComponentFixture<CeoUseractivityHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoUseractivityHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoUseractivityHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
