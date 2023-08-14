import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssuereportPage } from './issuereport.page';

describe('IssuereportPage', () => {
  let component: IssuereportPage;
  let fixture: ComponentFixture<IssuereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
