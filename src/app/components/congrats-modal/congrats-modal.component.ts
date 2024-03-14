import { Component, OnInit, inject } from '@angular/core';
import { NameDataService } from '../../services/name-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-congrats-modal',
  standalone: true,
  imports: [],
  templateUrl: './congrats-modal.component.html'
})
export class CongratsModalComponent implements OnInit {

  getName: string = '';
  activeModal = inject(NgbActiveModal);
  
  constructor(private name: NameDataService){}

  ngOnInit(){
    this.name.currentName.subscribe( name => this.getName = name);
  }

}
