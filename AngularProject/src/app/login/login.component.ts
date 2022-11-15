import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  display: boolean = true;

  logout(): void{
    sessionStorage.removeItem("ID:");  //how to get it back to null
    sessionStorage.setItem('Name:', "");
    this.display = false;
    console.log("in logout " + this.display);
    window.location.href = '/Home';
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if( sessionStorage.getItem('ID:') == null ) {
      this.display = false;
    }
    else {
      var x = sessionStorage.getItem('ID:');
      if (x != null){
        this.display = true;
      }
    }
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "906955082367-08m0813cvptb5d8g15ecat9u8r0tj28k.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)

    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "icon", shape: "rectangular", theme:"filled_blue" }
    );
  }

  handleGoogleSignIn(response: any): void {
    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));
    var goggleobject = JSON.parse(jsonPayload);
    console.log(goggleobject.name);
    console.log(goggleobject.iat);
    sessionStorage.setItem('ID:', goggleobject.sub ); // The unique ID of the user's Google Account
    sessionStorage.setItem('Name:', goggleobject.name);
    sessionStorage.setItem('Email', goggleobject.email)
    var currentUser: User = { UserId: goggleobject.sub, Name: goggleobject.name, Email: goggleobject.email};
    this.userService.addUser(currentUser).subscribe();
    
    this.display = true;
    window.location.href = '/Home';
  }

}
