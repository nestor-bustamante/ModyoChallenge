import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NameDataService } from '../../services/name-data.service';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './name-modal.component.html'
})
export class NameModalComponent {

  activeModal = inject(NgbActiveModal);
  nameForm: FormGroup;
  submitted = false;
  getName: string = "";
  
  constructor( private name: NameDataService ){

    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }

  get form(): { [key: string]: AbstractControl } { return this.nameForm.controls };
  

  onSubmit() {

    this.submitted = true;

    if (this.nameForm.invalid) return;

    if(!this.nameForm.invalid) {
      this.name.currentName.subscribe( (name: string) => this.getName = name );
      this.name.getName(this.nameForm.controls['name'].value);
      this.activeModal.close('Ok click')
    }

  }
}
