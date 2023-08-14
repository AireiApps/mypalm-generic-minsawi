import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoProductionreportsHomePage } from './ceo-productionreports-home.page';

describe('CeoProductionreportsHomePage', () => {
  let component: CeoProductionreportsHomePage;
  let fixture: ComponentFixture<CeoProductionreportsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoProductionreportsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoProductionreportsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
