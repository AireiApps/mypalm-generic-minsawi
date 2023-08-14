import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepaymentreportPage } from './prepaymentreport.page';

describe('PrepaymentreportPage', () => {
  let component: PrepaymentreportPage;
  let fixture: ComponentFixture<PrepaymentreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaymentreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepaymentreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
