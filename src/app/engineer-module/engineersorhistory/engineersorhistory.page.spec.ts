import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EngineersorhistoryPage } from './engineersorhistory.page';

describe('EngineersorhistoryPage', () => {
  let component: EngineersorhistoryPage;
  let fixture: ComponentFixture<EngineersorhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineersorhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EngineersorhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
