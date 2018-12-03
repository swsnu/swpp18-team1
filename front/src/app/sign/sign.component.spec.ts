import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignComponent } from './sign.component';
import { UserService } from '../../service/user.service';
import { mockUserService } from '../mock';

describe('SignComponent', () => {
  let component: SignComponent;
  let fixture: ComponentFixture<SignComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      declarations: [ SignComponent ],
      providers: [
        {
          provide: UserService,
          useClass: mockUserService
        }, {
          provide: Router,
          useValue: routerSpy
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp successfully', async(() => {
    spyOn(component, 'signUp').and.callThrough();
    spyOn(userService, 'isSignIn').and.callThrough();
    spyOn(component, 'ngAfterContentInit').and.callThrough();

    component.user.username = "username";
    component.user.password = "password";
    component.signUp(component.user.username, component.user.password);
    
    fixture.whenStable().then(() => {
      expect(component.signUp).toHaveBeenCalledWith('username', 'password');
      expect(userService.isSignIn).toBeTruthy();
      expect(component.ngAfterContentInit).toBeTruthy();
    });
  }));

  it('should call signIn successfully', () => {
    spyOn(component, 'signIn').and.callThrough();
    spyOn(userService, 'isSignIn').and.callThrough();
    spyOn(component, 'ngAfterContentInit').and.callThrough();

    component.user.username = "username";
    component.user.password = "password";
    component.signIn(component.user.username, component.user.password);
    
    fixture.whenStable().then(() => {
      expect(component.signIn).toHaveBeenCalledWith('username', 'password');
      expect(userService.isSignIn).toBeTruthy();
      expect(component.ngAfterContentInit).toBeTruthy();
    });
  });
  
});
