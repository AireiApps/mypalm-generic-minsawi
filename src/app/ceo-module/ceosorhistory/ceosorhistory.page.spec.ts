import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeosorhistoryPage } from './ceosorhistory.page';

describe('CeosorhistoryPage', () => {
  let component: CeosorhistoryPage;
  let fixture: ComponentFixture<CeosorhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeosorhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeosorhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
