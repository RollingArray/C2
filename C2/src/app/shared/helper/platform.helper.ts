import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


@Injectable()

export class PlatformHelper { 

  platformList = '';

  constructor(
    private platform: Platform
  ) {
    const platforms = this.platform.platforms();
    this.platformList = platforms.join(', ');
  }

  getDevicePlatform(){
    let deviceType = '';
    
    if (this.platform.is('ipad')){
      deviceType = 'ipad';
    }
    else if (this.platform.is('iphone')){
      deviceType = 'iphone';
    }
    else if (this.platform.is('ios')){
      deviceType = 'ios';
    }
    else if(this.platform.is('android')) {
      deviceType = 'android';
    }

    else if(this.platform.is('phablet')) {
      deviceType = 'phablet';
    }

    else if(this.platform.is('tablet')) {
      deviceType = 'tablet';
    }

    else if(this.platform.is('cordova')) {
      deviceType = 'cordova';
    }

    else if(this.platform.is('capacitor')) {
      deviceType = 'capacitor';
    }

    else if(this.platform.is('pwa')) {
      deviceType = 'pwa';
    }

    else if(this.platform.is('mobile')) {
      deviceType = 'mobile';
    }

    else if(this.platform.is('mobileweb')) {
      deviceType = 'mobileweb';
    }

    else if(this.platform.is('desktop')) {
      deviceType = 'desktop';
    }

    else if(this.platform.is('hybrid')) {
      deviceType = 'hybrid';
    }

    else{
      deviceType = 'unknown';
    }
    return deviceType;
  }

  isApp(){

    let deviceType = this.getDevicePlatform();

    //this.platformList = platforms.join(', ');

    if (
      deviceType === 'pwa' || 
      deviceType === 'mobileweb' || 
      deviceType === 'tablet' || 
      deviceType ==='desktop' ) {
      return false;
    }
    else{
      return true;
    }
  }
}
