import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestamoDetailPage } from './prestamo-detail.page';

describe('PrestamoDetailPage', () => {
  let component: PrestamoDetailPage;
  let fixture: ComponentFixture<PrestamoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestamoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
