import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetworkconnectionerrorPage } from './networkconnectionerror.page';

describe('NetworkconnectionerrorPage', () => {
  let component: NetworkconnectionerrorPage;
  let fixture: ComponentFixture<NetworkconnectionerrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkconnectionerrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkconnectionerrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
