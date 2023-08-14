import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SorreportPage } from './sorreport.page';

describe('SorreportPage', () => {
  let component: SorreportPage;
  let fixture: ComponentFixture<SorreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SorreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
