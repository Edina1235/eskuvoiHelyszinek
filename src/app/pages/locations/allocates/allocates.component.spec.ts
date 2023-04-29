import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatesComponent } from './allocates.component';

describe('AllocatesComponent', () => {
  let component: AllocatesComponent;
  let fixture: ComponentFixture<AllocatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
