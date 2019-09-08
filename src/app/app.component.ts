import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit {

   currentUser: any;

   private subscription: Subscription;

   constructor(private authService: AuthenticationService,
      private router: Router) {
         this.subscription = this.authService.currentUserObject.subscribe(value=>{
            this.currentUser = value;
         });
   }

   ngOnInit() {

   }

   logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
   }

}
