import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoilelogbookPage } from './boilelogbook.page';

describe('BoilelogbookPage', () => {
  let component: BoilelogbookPage;
  let fixture: ComponentFixture<BoilelogbookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilelogbookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoilelogbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
