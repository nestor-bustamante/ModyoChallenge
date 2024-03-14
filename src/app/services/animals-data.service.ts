import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

interface State {
  animals: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AnimalsDataService {

  private http = inject(HttpClient);

  #state = signal<State>({
    animals: []
  });

  public animals = computed( () => this.#state().animals );

  constructor() {
    this.http.get( environment.urlAnimals )
    .subscribe( (res: any) => {
        this.#state.set({
          animals: this.shuffleArray(res.entries.concat(res.entries))
        });
      }
    )
  }

  shuffleArray(arr:[]) {
    let currentIndex = arr.length,
        randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [ arr[randomIndex], arr[currentIndex]];
    }  
    return arr;
  }

}
