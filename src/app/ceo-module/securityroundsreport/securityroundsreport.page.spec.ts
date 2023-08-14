import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecurityroundsreportPage } from './securityroundsreport.page';

describe('SecurityroundsreportPage', () => {
  let component: SecurityroundsreportPage;
  let fixture: ComponentFixture<SecurityroundsreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityroundsreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityroundsreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
