import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreIssuePage } from './store-issue.page';

describe('StoreIssuePage', () => {
  let component: StoreIssuePage;
  let fixture: ComponentFixture<StoreIssuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreIssuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
