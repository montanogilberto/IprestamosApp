import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvalesPage } from './avales.page';

describe('AvalesPage', () => {
  let component: AvalesPage;
  let fixture: ComponentFixture<AvalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
