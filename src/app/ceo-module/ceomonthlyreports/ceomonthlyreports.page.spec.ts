import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeomonthlyreportsPage } from './ceomonthlyreports.page';

describe('CeomonthlyreportsPage', () => {
  let component: CeomonthlyreportsPage;
  let fixture: ComponentFixture<CeomonthlyreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeomonthlyreportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeomonthlyreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
