import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoSchedulingreportPage } from './ceo-schedulingreport.page';

describe('CeoSchedulingreportPage', () => {
  let component: CeoSchedulingreportPage;
  let fixture: ComponentFixture<CeoSchedulingreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoSchedulingreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoSchedulingreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
