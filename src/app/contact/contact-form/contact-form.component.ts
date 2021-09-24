import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  formSubmitted: boolean = false;
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private fb: FormBuilder) {
    // this.contactForm = this.fb.group({
    //   fname: ['', [Validators.required]],
    //   lname: [''],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['']
    // });


  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      contacts: this.fb.array([this.createContactFormGroup()])
    });
  }

  createContactFormGroup(): FormGroup {

    return this.fb.group({
      'fname': ['', [Validators.required]],
      'lname': [''],
      'email': ['', [Validators.required, Validators.email]],
      'phone': ['']
    });
    // return new FormGroup({
    //   fname: new FormControl('', Validators.required),
    //   lname: new FormControl(''),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   phone: new FormControl('')
    // });

  }
  get contactFormGroups() {
    return this.contactForm.get('contacts') as FormArray
  }
  addContact() {
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.push(this.createContactFormGroup());
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }
  removeContact(contactindex: any) {
    const contacts = this.contactForm.get('contacts') as FormArray;
    console.log(contactindex, contacts);
    console.log('form', this.contactForm.get(['contacts', contactindex]));
    contacts.removeAt(contactindex);


  }
  removeTab(contact: number) {
    // let contactArrayForm=this.contactForm.get('contacts') as FormArray;
    // if(this.contactForm.get(['contacts', contact])){
    // console.log('form', this.contactForm.get(['contacts', contact]));
    // contactArrayForm.removeAt(contact)
    this.contactFormGroups.removeAt(contact)
    // }
  }


}
