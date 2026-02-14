import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindonationviewComponent } from './admindonationview.component';

describe('AdmindonationviewComponent', () => {
  let component: AdmindonationviewComponent;
  let fixture: ComponentFixture<AdmindonationviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindonationviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmindonationviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
