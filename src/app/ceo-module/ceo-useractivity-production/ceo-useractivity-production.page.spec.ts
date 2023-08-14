import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoUseractivityProductionPage } from './ceo-useractivity-production.page';

describe('CeoUseractivityProductionPage', () => {
  let component: CeoUseractivityProductionPage;
  let fixture: ComponentFixture<CeoUseractivityProductionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoUseractivityProductionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoUseractivityProductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
