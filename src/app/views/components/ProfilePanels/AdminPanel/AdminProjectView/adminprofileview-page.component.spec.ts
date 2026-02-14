import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprofileviewPageComponent } from './adminprofileview-page.component';

describe('AdminprofileviewPageComponent', () => {
  let component: AdminprofileviewPageComponent;
  let fixture: ComponentFixture<AdminprofileviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminprofileviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminprofileviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
