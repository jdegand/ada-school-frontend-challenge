import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  apiService = inject(ApiService);

  @ViewChild('bookingForm') form!: NgForm;

  // Using null causes problems in the template
  model = {
    origin: null,
    destination: null,
    occupants: null,
    date: null,
    time: null
  };

  origins = [
    {
      value: 1,
      label: 'Manhattan',
    },
    {
      value: 2,
      label: 'Brooklyn',
    },
    {
      value: 3,
      label: 'Queens',
    },
    {
      value: 4,
      label: 'Bronx'
    },
    {
      value: 5,
      label: 'Staten Island'
    }
  ];

  destinations = [
    {
      value: 1,
      label: 'Jersey City',
    },
    {
      value: 2,
      label: 'Newark',
    },
    {
      value: 3,
      label: 'Albany',
    },
    {
      value: 4,
      label: 'Buffalo'
    },
    {
      value: 5,
      label: 'Edison'
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      console.log('form', this.form);
      let formData = new FormData();

      /*
      for (const field in this.form.controls) {
        if (this.form.controls.hasOwnProperty(field)) {
          // have to convert to match Booking model 
          console.log('field', field);
          const control = this.form.controls[field];
          console.log('control', control);
          formData.append(field, control.value);
          formData.append('id', new Date().getTime().toString())
        }
      }
      */

      formData.append("origin", this.form.controls['formSelect'].value);
      formData.append("destination", this.form.controls['destination'].value);
      formData.append("occupants", this.form.controls['passengers'].value);
      formData.append("date", this.form.controls['date'].value);
      formData.append("time", this.form.controls['time'].value);

      formData.forEach((value, key) => {
        console.log(key + " " + value)
      });

      const jsonData = this.convertFormDataToJson(formData);

      this.apiService.addBooking(jsonData).subscribe((data) => console.log('data', data));

      this.form.reset();

    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched();
      });
    }

  }

  convertFormDataToJson(formData: FormData): any {
    let jsonObject: any = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return jsonObject;
  }

}
