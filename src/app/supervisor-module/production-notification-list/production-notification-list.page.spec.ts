import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionNotificationListPage } from './production-notification-list.page';

describe('ProductionNotificationListPage', () => {
  let component: ProductionNotificationListPage;
  let fixture: ComponentFixture<ProductionNotificationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionNotificationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionNotificationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
