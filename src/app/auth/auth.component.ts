import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import AlertComponent from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

import { AuthResponseData, AuthService } from './auth.service';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit,OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
  private closeSub:Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
        this.store.dispatch(new AuthActions.LoginStart({
          email,
          password
        }));
    } else {
        this.store.dispatch(new AuthActions.SignupStart({
          email,
          password
        }));
    }

    form.reset();
  }

  onHandleError(){
      this.error=null;
  }


  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isLoading=authState.loading;
      this.error=authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
  }


  private showErrorAlert(message: string){
    
    // const alertComp=new AlertComponent();
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();

    const componentRef= hostViewContainer.createComponent(alertCompFactory);
    componentRef.instance.message=message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainer.clear(); 
    });

  }


  ngOnDestroy(){
      if(this.closeSub){
          this.closeSub.unsubscribe();
      }
  }

}
