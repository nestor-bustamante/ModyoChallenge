
import {ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../../components/name-modal/name-modal.component';
import { NameDataService } from '../../services/name-data.service';
import { AnimalsDataService } from '../../services/animals-data.service';
import { CommonModule } from '@angular/common';
import { PointsDataService } from '../../services/points-data.service';
import { CongratsModalComponent } from '../../components/congrats-modal/congrats-modal.component';

@Component({
  selector: 'app-challenge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {
  
  getName: string = '';
  animalsService = inject(AnimalsDataService);
  #modalService = inject(NgbModal);
  errorCounter = 0;
  assertCounter = 0;
  getSelected: any;
  posPoints: number = 0;
  positivePointsSubs = this.point.positivePoints.subscribe( value => this.posPoints = value);

  public pairs = signal({
    first: '',
    second:  ''
  });

  constructor( private name: NameDataService, private point: PointsDataService){}
  
  clearSelected(){
    setTimeout(() => {
      this.getSelected = document.querySelectorAll(".cards.selected");
      this.getSelected.forEach( (item: any) => item.classList.remove("selected"));
      this.pairs.update( value => ({
        ...value,
        first: "",
        second: ""
      }));
      
      this.point.setNegative(this.errorCounter += 1);
    }, 800);
    
  }

  successModal(points: number){
    const midArr = this.animalsService.animals().length / 2;
    if(points === midArr ) {
      this.openModal(CongratsModalComponent);
    }
  }


  checkPoints(){

    if (this.pairs().first === this.pairs().second) {
      
      this.point.setPositive(this.assertCounter += 1);
      const positive = document.getElementById("positive") as HTMLAudioElement;
      positive.play();

      setTimeout(() => {
        this.getSelected = document.querySelectorAll(".cards.selected");
        this.getSelected.forEach( (item: any) => item.classList.add("success"));
        this.getSelected.forEach( (item: any) => item.classList.remove("selected"));
        this.pairs.update( value => ({
          ...value,
          first: "",
          second: ""
        }));
        this.successModal(this.posPoints);
      }, 800);
      return;
    }
    this.clearSelected();
    const negative = document.getElementById("negative") as HTMLAudioElement;
    negative.play();
    
  }

  checkName() {
    if(this.getName.length === 0) this.openModal(NameModalComponent)
  }

  checkPairsCards(id: string, selected: boolean ){

    if(this.pairs().first !== '' && this.pairs().second !== '') return;

    if(!selected) {
      if (this.pairs().first === '') {
        this.pairs.update( value => ({
          ...value,
          first: id
        })) 
      } else {
        this.pairs.update( value => ({
          ...value,
          second: id
        }))
        this.checkPoints();
      }
    }

  }

  selectCard(event: Event, id: string ){
    const target = event.target as HTMLElement;
    if (target.tagName !== "DIV") return;
    const isSlected = target.classList.contains("selected");
    if (this.pairs().first === '' || this.pairs().second === ''){
      this.checkPairsCards(id, isSlected);
      if(!target.classList.contains("selected")) target.classList.add("selected");
    }
  }

	openModal(modalName: any) {
		this.#modalService.open(
      modalName, 
      { 
        centered: true, 
        backdrop: 'static' 
      }
    );
	}

  ngOnInit(){
    this.name.currentName.subscribe( name => this.getName = name);
    this.point.positivePoints.subscribe( point => this.assertCounter = point);
    this.point.negativePoints.subscribe( point => this.errorCounter = point);
    this.checkName();
  }
}