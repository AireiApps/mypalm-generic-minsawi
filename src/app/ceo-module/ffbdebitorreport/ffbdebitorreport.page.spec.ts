import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FfbdebitorreportPage } from './ffbdebitorreport.page';

describe('FfbdebitorreportPage', () => {
  let component: FfbdebitorreportPage;
  let fixture: ComponentFixture<FfbdebitorreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfbdebitorreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FfbdebitorreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
