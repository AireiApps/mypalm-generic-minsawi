import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegregatenotificationalertsPage } from './segregatenotificationalerts.page';

describe('SegregatenotificationalertsPage', () => {
  let component: SegregatenotificationalertsPage;
  let fixture: ComponentFixture<SegregatenotificationalertsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregatenotificationalertsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegregatenotificationalertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
