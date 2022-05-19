import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public observableSubs: Subscription;

  constructor() {

/*     this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      xmx =>  console.log('el valor es :', xmx),
      err => console.warn('Algo salió mal:', err),
      () => console.info('Terminó correctamente')
    ); */
    this.observableSubs = this.retornaInterval().subscribe(
      console.log
    )
  }
  ngOnDestroy(): void {
    this.observableSubs.unsubscribe();
  }

  retornaInterval(): Observable<number>{
    return interval(100)
    .pipe(
      map(valor => valor + 1),
      filter(valor => (valor % 2 == 0) ? true : false),
      take(10),
    );
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observable => {
      
      const observab = setInterval( () => {
        i++;
       observable.next(i);

       if(i == 4){
        clearInterval(observab);
        observable.complete();
       };

       if(i ==2){
        observable.error('Errorrr');
       }

      }, 1000 );

    });
  }


}
