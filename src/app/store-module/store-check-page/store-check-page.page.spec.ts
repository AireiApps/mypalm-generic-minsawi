import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreCheckPagePage } from './store-check-page.page';

describe('StoreCheckPagePage', () => {
  let component: StoreCheckPagePage;
  let fixture: ComponentFixture<StoreCheckPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCheckPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreCheckPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
