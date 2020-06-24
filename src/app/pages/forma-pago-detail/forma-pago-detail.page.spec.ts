import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormaPagoDetailPage } from './forma-pago-detail.page';

describe('FormaPagoDetailPage', () => {
  let component: FormaPagoDetailPage;
  let fixture: ComponentFixture<FormaPagoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormaPagoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
