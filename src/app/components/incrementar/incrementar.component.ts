import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementar',
  templateUrl: './incrementar.component.html',
  styles: [
  ]
})
export class IncrementarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.btnColor = `btn ${this.btnColor}`
  }

    // @input('valor') progress = 40;
    @Input() public progress: number;
    @Input() public btnColor: string = 'btn btn-primary';
    @Output() public valorEmitir: EventEmitter<number> = new EventEmitter();

  operarBarra( valor: number){
    this.progress = this.progress + valor;
    this.valorEmitir.emit(this.progress);

    if(this.progress >= 100 && valor >=0){
      this.valorEmitir.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && valor < 0){
      this.valorEmitir.emit(0);
      return this.progress = 0;
    }
  }

  onChange( valor: number){

    if(valor >= 100){
      this.progress = 100;
    }else if(valor <= 0){
      this.progress = 0
    }else{
      this.progress = valor;
    }

    this.valorEmitir.emit(valor);
  }

}
