import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoGradingreportsHomePage } from './ceo-gradingreports-home.page';

describe('CeoGradingreportsHomePage', () => {
  let component: CeoGradingreportsHomePage;
  let fixture: ComponentFixture<CeoGradingreportsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoGradingreportsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoGradingreportsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
