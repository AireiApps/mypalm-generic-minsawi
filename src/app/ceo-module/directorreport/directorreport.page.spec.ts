import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectorreportPage } from './directorreport.page';

describe('DirectorreportPage', () => {
  let component: DirectorreportPage;
  let fixture: ComponentFixture<DirectorreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectorreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
