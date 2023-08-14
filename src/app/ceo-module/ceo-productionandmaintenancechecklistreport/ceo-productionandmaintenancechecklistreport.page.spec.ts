import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoProductionandmaintenancechecklistreportPage } from './ceo-productionandmaintenancechecklistreport.page';

describe('CeoProductionandmaintenancechecklistreportPage', () => {
  let component: CeoProductionandmaintenancechecklistreportPage;
  let fixture: ComponentFixture<CeoProductionandmaintenancechecklistreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoProductionandmaintenancechecklistreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoProductionandmaintenancechecklistreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
