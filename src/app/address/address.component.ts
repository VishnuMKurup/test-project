import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  countryList = [
    { code: 'IND', name: 'INDIA' },
    { code: 'USA', name: 'United States Of America' }
  ];
  stateList = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' }
  ]
  addressForm: FormGroup;
  submitted: boolean;
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'x', /\d/, /\d/, /\d/, /\d/, /\d/];
  isShowShipping = true;
  phonePattern = /^\(?([0-9]{3})\)[ ]?([0-9]{3})[-]?([0-9]{4})([ ][xX][0-9]{5})?$/;
  constructor(private fb: FormBuilder) { }

  createForm() {
    this.addressForm = this.fb.group({
      'contact_information': this.fb.group({
        'first_name': ['', [Validators.required]],
        'last_name': [''],
        'email': ['', [Validators.required, Validators.email]],
        'phone': ['',[Validators.required,
          Validators.pattern(this.phonePattern)]]
      }),
      'billing_address': this.initAddressForm(),
      'shipping_address': this.initAddressForm()
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  initAddressForm() {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'address_1': ['', [Validators.required]],
      'address_2': [''],
      'city': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'country': ['', [Validators.required]],
      'zip': ['', [Validators.required]],
      'phone': ['',[Validators.required,
        Validators.pattern(this.phonePattern)]]

    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    }
  }

  get shippingAddress() {
    return this.addressForm.get('shipping_address') as FormGroup;
  }

  get billingAddress() {
    return this.addressForm.get('billing_address') as FormGroup;
  }

  onChange(e) {
    if (e.target.checked) {
      this.isShowShipping = false;
      this.shippingAddress.setValue(this.billingAddress.value);
    }
    else {
      this.isShowShipping = true;
      this.shippingAddress.reset();
    }
  }
}
