import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	// Interceptor constructor
	constructor(
		private localStorageService: LocalStorageService
	) {}

	// intecept
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		// add authorization header with jwt token if available
		const currentUserToken: string = this.localStorageService.getToken();

		// if tken available add it as auth header
		if (currentUserToken) {
			//console.log(currentUserToken);

			request = request.clone({
				setHeaders: {
					Auth: `${currentUserToken}`
				}
			});
		}
		return next.handle(request);
	}
}
