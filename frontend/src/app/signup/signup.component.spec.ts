import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { SignupComponent } from './signup.component';
import {ItemService} from '../item.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, LoginComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
        [
          {path : 'login', component: LoginComponent},
          {path : 'signup', component: SignupComponent}
        ]
      )
      ],
      providers: [
        {provide: ItemService, useClass: ItemService},

      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SignupComponent);

      component = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call the add_user method`, async(() => {
     spyOn(component, 'add_user');
     el = fixture.debugElement.query(By.css('button')).nativeElement;
     el.click();
     expect(component.add_user).toHaveBeenCalled();
   }));
});
