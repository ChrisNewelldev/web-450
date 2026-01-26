import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent, RouterTestingModule],
    }).compileComponents();

    // Prevent real navigation during tests (Karma flags navigation as "full page reload")
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true) as any);

    // Make user admin so the component doesn't try to redirect
    const sessionUser = encodeURIComponent(JSON.stringify({ username: 'testuser', role: 'admin' }));
    document.cookie = `sessionUser=${sessionUser}; path=/`;

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.cookie = 'sessionUser=; Max-Age=0; path=/';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});