import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmited = false;

  public registerForm = this.fb.group({
    nombre: ['Jose', Validators.required],
    email: ['jose123@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.validarContrasenas( 'password', 'password2')
  })

  constructor( 
    private fb: FormBuilder,
    private usuarioService: UsuarioService
    ) { }

  crearUsuario(){
    this.formSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
        return
    }

    this.usuarioService.crearUsuario( this.registerForm.value).subscribe( res => {
      console.log(res);
      console.log('Usuario creado');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  //Funcion paa comparar contraseñas e imprimir en pantalla el mensaje
  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmited) {
      return true;
    }
    return false;
  }

  campoNoValido(campo: string): boolean{
    if (this.registerForm.get(campo).invalid && this.formSubmited) {
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmited;
  }

  //Funcion para validar contraseñas iguales y que no se haga la petición a la api
  validarContrasenas(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {
      const pass1Name = formGroup.get(pass1);
      const pass2Name = formGroup.get(pass2);

      if (pass1Name.value === pass2Name.value) {
          pass2Name.setErrors(null);
      }else{
        console.log('Entroooo')
          pass2Name.setErrors({ noEsValido: true});
      }
    }
  }

}
