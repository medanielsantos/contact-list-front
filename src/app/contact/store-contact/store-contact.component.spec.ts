import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreContactComponent } from './store-contact.component';

describe('StoreContactComponent', () => {
  let component: StoreContactComponent;
  let fixture: ComponentFixture<StoreContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreContactComponent]
    });
    fixture = TestBed.createComponent(StoreContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
