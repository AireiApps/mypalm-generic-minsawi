import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KpireportPage } from './kpireport.page';

describe('KpireportPage', () => {
  let component: KpireportPage;
  let fixture: ComponentFixture<KpireportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpireportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KpireportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
