import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  email:string;
  senha:string;
  nome: string;
  urlImagem: string;
  abreEmailCadastro:boolean;

  constructor(public afAuth: AngularFireAuth){
    this.user=this.afAuth.authState;
  }
  //title = 'app';

  loginFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  vincularFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((res:any)=> {
      firebase.auth().currentUser.linkWithCredential(res.credential).then((user)=>{
        console.log(user);
      })
      .catch((err:any)=>{
        console.log(err);
      });
    })
    .catch((err:any)=>{
      firebase.auth().currentUser.linkWithCredential(err.credential).then((user)=>{
        console.log(user);
      })
      .catch((err:any)=>{
        console.log(err);
      });;
    });
  }

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  vinculaGithub(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((res:any)=> {
      firebase.auth().currentUser.linkWithCredential(res.credential).then((user)=>{
        console.log(user);
      })
      .catch((err:any)=>{
        console.log(err);
      });
    })
    .catch((err:any)=>{
      firebase.auth().currentUser.linkWithCredential(err.credential).then((user)=>{
        console.log(user);
      })
      .catch((err:any)=>{
        console.log(err);
      });;
    });
  }

  loginEmail(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.senha)
    .catch((erro:any)=>{
      console.log("Erro:" + erro);
    });
  }

  cadastroEmail(){
    this.abreEmailCadastro = false;
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.senha)
    .then((res:any)=> {
      console.log(res);
      let usuario = firebase.auth().currentUser;
      usuario.updateProfile({
        displayName:this.nome,
        photoURL:this.urlImagem
      });
    })
    .catch((erro:any)=>{
      console.log("Erro:" + erro);
    });
  }

  vinculaEmail(){
    let credential = firebase.auth.EmailAuthProvider.credential(this.email,this.senha);
    firebase.auth().currentUser.linkWithCredential(credential).then((user)=>{
      console.log(user);
    })
    .catch((err:any)=>{
      console.log(err);
    });
  }

  sair(){
    this.afAuth.auth.signOut();
  }
}
