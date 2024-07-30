import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

  apiService = inject(ApiService);

  @ViewChild('bookingForm') form!: NgForm;

  model = {
    origin: null,
    destination: null,
    occupants: null,
    date: null,
    time: null
  };

  origins = [
    {
      value: 'Manhattan',
    },
    {
      value: 'Brooklyn',
    },
    {
      value: 'Queens',
    },
    {
      value: 'Bronx',
    },
    {
      value: 'Staten Island',
    }
  ];

  destinations = [
    {
      value: 'Jersey City',
    },
    {
      value: 'Newark',
    },
    {
      value: 'Albany',
    },
    {
      value: 'Buffalo'
    },
    {
      value: 'Edison'
    }
  ];

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.form.valid) {
      // having formData created in this method is problematic for testing
      // can't access the formData object to check values
      let formData = new FormData();

      formData.append("origin", this.form.controls['formSelect'].value);
      formData.append("destination", this.form.controls['destination'].value);
      formData.append("occupants", this.form.controls['passengers'].value);
      formData.append("date", this.form.controls['date'].value);
      formData.append("time", this.form.controls['time'].value);

      const jsonData = this.convertFormDataToJson(formData);

      this.apiService.addBooking(jsonData).subscribe((data) => console.log('data', data));

      this.form.reset();

    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched();
      });
    }

  }

  convertFormDataToJson(formData: FormData) {
    const jsonObject: any = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return jsonObject;
  }

}
