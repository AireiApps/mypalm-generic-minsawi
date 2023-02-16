import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionNotificationViewPage } from './production-notification-view.page';

describe('ProductionNotificationViewPage', () => {
  let component: ProductionNotificationViewPage;
  let fixture: ComponentFixture<ProductionNotificationViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionNotificationViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionNotificationViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
