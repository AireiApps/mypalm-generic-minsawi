import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoWeighbridgereportPage } from './ceo-weighbridgereport.page';

describe('CeoWeighbridgereportPage', () => {
  let component: CeoWeighbridgereportPage;
  let fixture: ComponentFixture<CeoWeighbridgereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoWeighbridgereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoWeighbridgereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
