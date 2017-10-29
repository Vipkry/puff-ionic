import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../domain/usuario/usuario-service';
import {DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = { name: '', reg: '', password: ''};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _service: UsuarioService, public _alertCtrl: AlertController, 
    private _loadingCtrl: LoadingController) {
  }
  
  salvaUsuario(){
    
    let loader = this._loadingCtrl.create({
      content: "Te cadastrando no nosso banco de dados. Relaxa ai"
    });
    loader.present();

    this._service.saveUser(this.user).then((result) => {
      console.log(result);
        this._service.login(this.user).then((result) => {
          if (result){
            this._service.setCurrentUser(this.user.reg);
            loader.dismiss();
            this.navCtrl.setRoot(DashboardPage);
          }
        }, (err) => {
          console.log(err);
        });
      
  
      let alert = this._alertCtrl.create({
      title: 'Olá!',
      subTitle: 'Bem vindo, '+this.user.name+'!',
      buttons: ['Bora!']
      });
      alert.present();
    }, (err) => {
      console.log(err);
    });
  }
}
