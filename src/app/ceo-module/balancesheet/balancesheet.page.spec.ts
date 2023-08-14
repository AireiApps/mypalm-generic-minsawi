import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BalancesheetPage } from './balancesheet.page';

describe('BalancesheetPage', () => {
  let component: BalancesheetPage;
  let fixture: ComponentFixture<BalancesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BalancesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
