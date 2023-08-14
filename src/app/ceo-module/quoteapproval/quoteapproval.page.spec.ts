import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuoteapprovalPage } from './quoteapproval.page';

describe('QuoteapprovalPage', () => {
  let component: QuoteapprovalPage;
  let fixture: ComponentFixture<QuoteapprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteapprovalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteapprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
