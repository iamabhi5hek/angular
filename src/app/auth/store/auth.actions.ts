import { Action } from "@ngrx/store";

export const LOGIN_START='[Auth] Login Start'
export const LOGIN_FAIL='[Auth] Login Fail'
export const AUTHENTICATE_SUCCESS='[Auth] Login';
export const AUTHENTICATE_FAIL='[Auth] Logout';
export const SIGNUP_START='[Auth] Signup Start';


export class AuthenticateSuccess implements Action {
    readonly type=AUTHENTICATE_SUCCESS;

    constructor(
        public payload:{
            email:string,
            userId:string,
            token:string,
            expirationDate:Date
        }
    ){}
}

export class AuthenticateFail implements Action {
    readonly type=AUTHENTICATE_FAIL;
}

export class LoginStart implements Action {
    readonly type=LOGIN_START;

    constructor(public payload:{
        email:string, 
        password: string
    }){}
}

export class LoginFail implements Action {
    readonly type=LOGIN_FAIL;

    constructor(public payload:string){}
}

export class SignupStart implements Action {
    readonly type=SIGNUP_START;

    constructor(public payload:{
        email:string, 
        password: string
    }){}
}

export type AuthActions = AuthenticateSuccess 
                        | AuthenticateFail
                        |LoginStart
                        |LoginFail
                        |SignupStart;