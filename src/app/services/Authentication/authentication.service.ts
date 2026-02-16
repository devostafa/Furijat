import {Injectable} from '@angular/core';
import {User} from "../../data/models/User";
import {AuthRequest} from "./DTO/AuthRequest";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject(false)
  authStatus = new BehaviorSubject("Login / Register")
  loggedUserType = new BehaviorSubject("user")
  //loggedUserData : User = {} as User
  currentIsLoggedIn = this.isLoggedIn.asObservable()
  currentAuthStatus = this.authStatus.asObservable()
  currentLoggedUserType = this.loggedUserType.asObservable()


  constructor(private http : HttpClient) {}

   Login(loginRequest: { password: string, username: string}){
    return this.http.post<string>(environment.backendurl + '/authentication/login', loginRequest).pipe(
      map( (tokenRes : string) => {

        if (tokenRes === "username / password are wrong") {
          return false
        }
        else {
          localStorage.setItem('token', tokenRes)
          return localStorage.getItem('token') !== null;
        }
      })
    )
  }

  AutoCheckLogin() {
    return this.http.get(environment.backendurl + "/authentication/checktoken").pipe(
      map((boolRes : boolean) => {
        if (boolRes) {
          this.GetActiveUser().subscribe()
          this.isLoggedIn.next(true)
        }
        else {
          this.isLoggedIn.next(false)
        }
        })
    )
  }

  Logout() {
    this.isLoggedIn.next(false)
    localStorage.removeItem("token")
    this.authStatus.next("Login/Register")
    return true
  }

  Register(registerReq : AuthRequest) {
    let check : boolean
    return this.http.post<string>(environment.backendurl + '/authentication/register', registerReq).pipe(
      map( (tokenRes) => {
        if (tokenRes !== null) {
          localStorage.setItem('token', tokenRes)
          check = true
        }
        else {
          check = false
        }
        return check
      })
    )
  }

  GetActiveUser() {
    let userdata : User = {} as User
    //TOKEN WILL BE APPENDED AUTOMATICALLY IN REQUEST HEADERS
      return this.http.get( environment.backendurl + '/authentication/getuser').pipe(
        map( (userdatares : User) => {
          this.authStatus.next(`${userdatares.userName}`)
          this.loggedUserType.next(userdatares.userType)
          userdata = userdatares
          return userdata
          })
      )
  }

}
