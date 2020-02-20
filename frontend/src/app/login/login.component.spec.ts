import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {ItemService} from '../item.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
        [
          {path : 'dashboard', component: DashboardComponent}
        ]
      )
      ],
      declarations: [ LoginComponent, DashboardComponent],
      providers: [
        {provide: ItemService, useClass: ItemService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
