import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { ApiService } from '../../service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, HttpClientTestingModule],
      providers: [ApiService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows required error message on blur', () => {
    fixture.detectChanges();
    const originInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#origin');

    originInput.dispatchEvent(new Event('focus'));
    originInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const originError = fixture.debugElement.nativeElement.querySelector('#origin-required');
    expect(originError.innerHTML).toEqual('Origin is required.');
  })

  it('submit fails when form is invalid', fakeAsync(() => {
    fixture.detectChanges();
    const originInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#origin');
    const destinationInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#destination');
    const passengersInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#passengers');
    const dateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#date');
    const timeInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#time');

    originInput.value = 'Brooklyn';
    destinationInput.value = 'null';
    passengersInput.value = '2';
    dateInput.value = '2024-07-18';
    timeInput.value = '20:00';

    originInput.dispatchEvent(new Event('change'));
    //destinationInput.dispatchEvent(new Event('change'));
    passengersInput.dispatchEvent(new Event('input'));
    dateInput.dispatchEvent(new Event('change'));
    timeInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelector("#submit-button");
    submitButton.click();
    tick();
    expect(component.form.invalid).toEqual(true);
    //expect(destinationInput.hasAttribute('aria-required')).toEqual(true);
  }))

  it('submit succeeds when form is valid', fakeAsync(() => {
    //spyOn(service, 'addBooking');
    const originInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#origin');
    const destinationInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#destination');
    const passengersInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#passengers');
    const dateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#date');
    const timeInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#time');

    originInput.value = 'Brooklyn';
    destinationInput.value = 'Buffalo';
    passengersInput.value = '2';
    dateInput.value = '2024-07-18';
    timeInput.value = '20:00';

    originInput.dispatchEvent(new Event('change'));
    destinationInput.dispatchEvent(new Event('change'));
    passengersInput.dispatchEvent(new Event('input'));
    dateInput.dispatchEvent(new Event('change'));
    timeInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.form.valid).toEqual(true);

    // component.onSubmit();

    const submitButton = fixture.debugElement.nativeElement.querySelector("#submit-button");
    submitButton.click();
    tick();
    fixture.detectChanges();
    expect(component.form.controls["destination"].value).toEqual(null);
  }))

  it('onSubmit is called', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const spy = spyOn(component, 'onSubmit');

      const originInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#origin');
      const destinationInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#destination');
      const passengersInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#passengers');
      const dateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#date');
      const timeInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#time');

      originInput.value = 'Brooklyn';
      destinationInput.value = 'Buffalo';
      passengersInput.value = '2';
      dateInput.value = '2024-07-18';
      timeInput.value = '20:00';

      originInput.dispatchEvent(new Event('change'));
      destinationInput.dispatchEvent(new Event('change'));
      passengersInput.dispatchEvent(new Event('input'));
      dateInput.dispatchEvent(new Event('change'));
      timeInput.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      const submitButton = fixture.debugElement.nativeElement.querySelector("#submit-button");
      submitButton.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
      })
    })

  }))

});

/*
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['postData']);

    TestBed.configureTestingModule({
      declarations: [MyComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiService }]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  it('should make an API request when form is submitted', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(apiService.postData).toHaveBeenCalled();
    // You can also add more specific assertions based on your API request
  });
});
*/