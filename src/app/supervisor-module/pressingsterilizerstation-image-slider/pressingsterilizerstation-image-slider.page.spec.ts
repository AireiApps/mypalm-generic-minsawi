import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PressingsterilizerstationImageSliderPage } from './pressingsterilizerstation-image-slider.page';

describe('PressingsterilizerstationImageSliderPage', () => {
  let component: PressingsterilizerstationImageSliderPage;
  let fixture: ComponentFixture<PressingsterilizerstationImageSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressingsterilizerstationImageSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PressingsterilizerstationImageSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
