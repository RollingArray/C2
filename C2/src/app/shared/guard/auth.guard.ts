import { LocalStorageService } from '../service/local-storage.service';
/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2019-07-11 09:53:43
 * @modify date 2019-07-11 09:53:43
 * @desc [description]
 */
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	/**
	 * Auth guard constructor
	 * @param  {Router} private router
	 * @param  {LocalStorageService} private localStorageService
	 */
	constructor(
		private router: Router,
		private localStorageService: LocalStorageService
	) {}

	/**
	 * @param  {ActivatedRouteSnapshot} route
	 * @param  {RouterStateSnapshot} state
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.localStorageService.getToken()) {
			// logged in so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/sign-in'], {
			// queryParams: { returnUrl: state.url }
		});
		return false;
	}
}
