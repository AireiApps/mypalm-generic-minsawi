import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnehourentryPage } from './onehourentry.page';

describe('OnehourentryPage', () => {
  let component: OnehourentryPage;
  let fixture: ComponentFixture<OnehourentryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnehourentryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnehourentryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
