import { Component, OnInit } from '@angular/core';
import { NameDataService } from '../../services/name-data.service';
import { PointsDataService } from '../../services/points-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  getName: string = '';
  getPositive: number = 0;
  getNegative: number = 0;

  constructor(private name: NameDataService, private points: PointsDataService ){}

  ngOnInit(){
    this.name.currentName.subscribe( name => this.getName = name);
    this.points.positivePoints.subscribe( point => this.getPositive = point);
    this.points.negativePoints.subscribe( point => this.getNegative = point);
  }

  

}
