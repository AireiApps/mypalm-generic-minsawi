import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MmslogreportPage } from './mmslogreport.page';

describe('MmslogreportPage', () => {
  let component: MmslogreportPage;
  let fixture: ComponentFixture<MmslogreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmslogreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MmslogreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
