import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameDataService {

  private nameSource = new BehaviorSubject<string>("");
  currentName = this.nameSource.asObservable();

  constructor() { }

  getName(name: string){
    this.nameSource.next(name);
  }

}
