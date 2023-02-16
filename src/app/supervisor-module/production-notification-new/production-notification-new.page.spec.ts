import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductionNotificationNewPage } from './production-notification-new.page';

describe('ProductionNotificationNewPage', () => {
  let component: ProductionNotificationNewPage;
  let fixture: ComponentFixture<ProductionNotificationNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionNotificationNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionNotificationNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
