import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomiciliosDetailPage } from './domicilios-detail.page';

describe('DomiciliosDetailPage', () => {
  let component: DomiciliosDetailPage;
  let fixture: ComponentFixture<DomiciliosDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomiciliosDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomiciliosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
