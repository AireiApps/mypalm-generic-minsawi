import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoBreakdownlistPage } from './ceo-breakdownlist.page';

describe('CeoBreakdownlistPage', () => {
  let component: CeoBreakdownlistPage;
  let fixture: ComponentFixture<CeoBreakdownlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoBreakdownlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoBreakdownlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
