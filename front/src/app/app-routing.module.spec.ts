import { AppRoutingModule } from './app-routing.module';
import {RouterTestingModule} from '@angular/router/testing'
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';	


describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule ]
    });
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});

describe('AppComponent', () => {
  let appComponent: AppComponent;

  beforeEach(() => {
    appComponent = new AppComponent();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule ]
    });
  });

  it('should create an instance', () => {
    expect(appComponent).toBeTruthy();
  });
});
