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

  constructor(public afAuth: AngularFireAuth){
    this.user=this.afAuth.authState;
  }
  //title = 'app';

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  loginEmail(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.senha)
    .catch((erro:any)=>{
      console.log("Erro:" + erro);
    });
  }

  cadastroEmail(){
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

  sair(){
    this.afAuth.auth.signOut();
  }
}
