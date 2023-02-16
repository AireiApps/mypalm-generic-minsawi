import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrcodescannerPage } from './qrcodescanner.page';

describe('QrcodescannerPage', () => {
  let component: QrcodescannerPage;
  let fixture: ComponentFixture<QrcodescannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodescannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodescannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
