import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatbotScreenPage } from './chatbot-screen.page';

describe('ChatbotScreenPage', () => {
  let component: ChatbotScreenPage;
  let fixture: ComponentFixture<ChatbotScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
