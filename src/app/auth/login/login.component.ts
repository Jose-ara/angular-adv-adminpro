import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void{
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "289574172158-bv6qdnmj9bbr26dj1dpgfoqfnkk1t99n.apps.googleusercontent.com",
      callback: response => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      /* document.getElementById("buttonDiv"), */
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential).subscribe( res => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/');
      })
    })
  }


  login(){

    this.usuarioService.LoginUsuario(this.loginForm.value).subscribe( res => {
        if (this.loginForm.get('remember').value) {
            localStorage.setItem('email',this.loginForm.get('email').value)
        }else{
          localStorage.removeItem('email');
        }
      this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

}
