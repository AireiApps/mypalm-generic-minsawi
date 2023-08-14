import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoUserlogreportPage } from './ceo-userlogreport.page';

describe('CeoUserlogreportPage', () => {
  let component: CeoUserlogreportPage;
  let fixture: ComponentFixture<CeoUserlogreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoUserlogreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoUserlogreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
