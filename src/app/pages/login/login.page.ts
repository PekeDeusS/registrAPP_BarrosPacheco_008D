import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userdata: any;

  usuario = {
    id: 0,
    username: "",
    password: "",
    role: "maestro",
    isactive: true
  };

  loginForm: FormGroup;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private alertController: AlertController,
    private authservice: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder // Usar formBuilder en lugar de builder
  ) {
    this.loginForm = this.formBuilder.group({
      'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  // En LoginPage

login() {
  if (this.loginForm.valid) {
    this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp => {
      this.userdata = resp;
      if (this.userdata.length > 0) {
        this.usuario = {
          id: this.userdata[0].id,
          username: this.userdata[0].username,
          password: this.userdata[0].password,
          role: this.userdata[0].role,
          isactive: this.userdata[0].isactive
        };
        if (this.usuario.password === this.loginForm.value.password) {
          if (this.usuario.isactive) {
            if (this.usuario.role === 'maestro') { // Validar que el rol sea "maestro"
              // Iniciar sesión solo para maestros
              sessionStorage.setItem('username', this.usuario.username);
              sessionStorage.setItem('userrole', this.usuario.role);
              sessionStorage.setItem('ingresado', 'true');
              this.showToast('Sesión Iniciada');
              this.router.navigateByUrl('/qrcode');
            } else {
              this.NoAccesoMaestro();
              this.loginForm.reset();
            }
          } else {
            this.UserInactivo();
            this.loginForm.reset();
          }
        } else {
          this.DatoError();
          this.loginForm.reset();
        }
      } else {
        this.NoExiste();
        this.loginForm.reset();
      }
    });
  }
}

async NoAccesoMaestro() {
  const alerta = await this.alertController.create({
    header: 'Acceso denegado',
    message: 'Solo los maestros pueden iniciar sesión.',
    buttons: ['Ok']
  });
  alerta.present();
  return;
}


  async showToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UserInactivo() {
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usuario inactivo, contactar a admin@admin.cl',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }

  async DatoError() {
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }

  async NoExiste() {
    const alerta = await this.alertController.create({
      header: 'Debe registrarse..',
      message: 'Usuario no existe',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }
}
