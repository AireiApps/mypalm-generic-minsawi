import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorecreditorreportPage } from './storecreditorreport.page';

describe('StorecreditorreportPage', () => {
  let component: StorecreditorreportPage;
  let fixture: ComponentFixture<StorecreditorreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorecreditorreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StorecreditorreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
