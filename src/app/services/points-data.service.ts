import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsDataService {

  private positive = new BehaviorSubject<number>(0);
  private negative = new BehaviorSubject<number>(0);

  positivePoints = this.positive.asObservable();
  negativePoints = this.negative.asObservable();

  constructor() { }

  setPositive(point: number){
    this.positive.next(point);
  }
  setNegative(point: number){
    this.negative.next(point);
  }

}
