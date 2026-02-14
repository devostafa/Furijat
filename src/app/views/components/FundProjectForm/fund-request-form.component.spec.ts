import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRequestFormComponent } from './fund-request-form.component';

describe('FundRequestFormComponent', () => {
  let component: FundRequestFormComponent;
  let fixture: ComponentFixture<FundRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
