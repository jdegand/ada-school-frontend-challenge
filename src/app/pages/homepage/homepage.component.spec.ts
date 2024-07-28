import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { ApiService } from '../../service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, HttpClientTestingModule],
      providers: [ApiService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
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
    passengersInput.dispatchEvent(new Event('input'));
    dateInput.dispatchEvent(new Event('change'));
    timeInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelector("#submit-button");
    submitButton.click();
    tick();
    expect(component.form.invalid).toEqual(true);
  }))

  it('submit succeeds when form is valid', fakeAsync(() => {
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
  }));

  it('should convert FormData to JSON object', function () {
    const formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');

    const jsonObject = component.convertFormDataToJson(formData);

    expect(jsonObject).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should return the current date in the format "YYYY-MM-DD"', function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const expectedDate = `${year}-${month}-${day}`;
    const actualDate = component.getTodayDate();

    expect(actualDate).toEqual(expectedDate);
  });

});
