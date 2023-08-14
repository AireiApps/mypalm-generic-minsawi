import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FfbHomePage } from './ffb-home.page';

describe('FfbHomePage', () => {
  let component: FfbHomePage;
  let fixture: ComponentFixture<FfbHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfbHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FfbHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
