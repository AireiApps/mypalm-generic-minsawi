import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FfbcreditorsreportPage } from './ffbcreditorsreport.page';

describe('FfbcreditorsreportPage', () => {
  let component: FfbcreditorsreportPage;
  let fixture: ComponentFixture<FfbcreditorsreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfbcreditorsreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FfbcreditorsreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
