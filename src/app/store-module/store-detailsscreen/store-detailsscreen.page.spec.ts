import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreDetailsscreenPage } from './store-detailsscreen.page';

describe('StoreDetailsscreenPage', () => {
  let component: StoreDetailsscreenPage;
  let fixture: ComponentFixture<StoreDetailsscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailsscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreDetailsscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
