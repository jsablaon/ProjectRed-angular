import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSearchComponent } from './store-search.component';

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
