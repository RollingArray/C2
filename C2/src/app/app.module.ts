import { UserService } from "./shared/service/user.service";
import { ApiInterceptor } from "./shared/interceptor/api-interceptor.interceptor";
import { AuthGuard } from "./shared/guard/auth.guard";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LocalStorageService } from './shared/service/local-storage.service';
import { LoadingService } from './shared/service/loading.service';
import { AlertService } from './shared/service/alert.service';
import { CreateEditProjectModule } from './component/create-edit-project/create-edit-project.module';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ProjectService } from './shared/service/project.service';

//fa
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { DisableBackService } from './shared/service/disable-back.service';

@NgModule({
	declarations: [
    AppComponent,
	],
	entryComponents: [
		
	],
	imports: [
    BrowserModule,
    IonicModule.forRoot({hardwareBackButton: false}),
		AppRoutingModule,
    HttpClientModule,
    CreateEditProjectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
	],
	providers: [
    //Push,
		AuthGuard,
    DatePipe,
    UserService,
    LocalStorageService,
    LoadingService,
    AlertService,
    ProjectService,
    DisableBackService,
    //SocialSharing,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
