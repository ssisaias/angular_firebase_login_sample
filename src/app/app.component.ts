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

  constructor(public afAuth: AngularFireAuth){
    this.user=this.afAuth.authState;
  }
  //title = 'app';

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  sair(){
    this.afAuth.auth.signOut();
  }
}
