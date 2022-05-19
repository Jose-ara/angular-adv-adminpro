import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  public users: any;

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(res => {
      this.users = res;
    })

/*     const promesa = new Promise((resolve, reject) => {

      if(false){
        resolve('hola mundo');
      }else{
        reject('Algo salió mal')
      }
    });

    promesa.then( (mensaje) => {
        console.log(mensaje)
    }).catch( (error) => {
      console.log(error);
    })

    console.log('Fin Init'); */
  }

  getUsuarios(){

    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then( res => res.json())
      .then( body => {
        resolve(body.data)
      });
    });
    return promesa
  }

}
