import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreStatusupdatePage } from './store-statusupdate.page';

describe('StoreStatusupdatePage', () => {
  let component: StoreStatusupdatePage;
  let fixture: ComponentFixture<StoreStatusupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreStatusupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreStatusupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
