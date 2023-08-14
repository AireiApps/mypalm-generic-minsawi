import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeosupervisormillcommentsPage } from './ceosupervisormillcomments.page';

describe('CeosupervisormillcommentsPage', () => {
  let component: CeosupervisormillcommentsPage;
  let fixture: ComponentFixture<CeosupervisormillcommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeosupervisormillcommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeosupervisormillcommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
