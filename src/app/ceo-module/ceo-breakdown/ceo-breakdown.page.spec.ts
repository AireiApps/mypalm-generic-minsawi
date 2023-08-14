import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoBreakdownPage } from './ceo-breakdown.page';

describe('CeoBreakdownPage', () => {
  let component: CeoBreakdownPage;
  let fixture: ComponentFixture<CeoBreakdownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoBreakdownPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoBreakdownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
