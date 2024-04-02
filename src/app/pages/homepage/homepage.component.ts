import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Observable, Subscription } from 'rxjs';
import { Booking } from '../../interface/booking.model';
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

  /*
  //@ViewChild('bookingForm') form!: NgForm;

  bookingForm = viewChild.required<NgForm>('bookingForm');

  onSubmit() {
    console.log(this.bookingForm())
  }
  */

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
      value:5,
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
      value:5,
      label: 'Edison'
    }
  ];

  onSubmit(){
    console.log(this.form);
  }

}
