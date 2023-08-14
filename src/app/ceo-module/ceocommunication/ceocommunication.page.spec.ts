import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeocommunicationPage } from './ceocommunication.page';

describe('CeocommunicationPage', () => {
  let component: CeocommunicationPage;
  let fixture: ComponentFixture<CeocommunicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeocommunicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeocommunicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
