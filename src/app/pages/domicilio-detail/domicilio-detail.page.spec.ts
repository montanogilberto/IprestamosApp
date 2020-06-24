import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomicilioDetailPage } from './domicilio-detail.page';

describe('DomicilioDetailPage', () => {
  let component: DomicilioDetailPage;
  let fixture: ComponentFixture<DomicilioDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomicilioDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
