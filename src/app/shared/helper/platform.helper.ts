/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Platform helper
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-03 20:13:10 
 * Last modified  : 2021-11-03 20:13:10 
 */


import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DevicePlatformEnum } from '../enum/device-platform.enum';


@Injectable()

export class PlatformHelper
{

	/**
	 * Creates an instance of device platform service.
	 * @param platform
	 */
	 constructor(public platform: Platform) { }

	 /**
	  * @description Gets device platform
	  * @returns
	  */
	 getDevicePlatform() {
		 let deviceType = '';
 
		 /* istanbul ignore else */
		 if (this.platform.is(DevicePlatformEnum.IPAD)) {
			 deviceType = DevicePlatformEnum.IPAD;
		 } else if (this.platform.is(DevicePlatformEnum.IPHONE)) {
			 deviceType = DevicePlatformEnum.IPHONE;
		 } else if (this.platform.is(DevicePlatformEnum.IOS)) {
			 deviceType = DevicePlatformEnum.IOS;
		 } else if (this.platform.is(DevicePlatformEnum.ANDROID)) {
			 deviceType = DevicePlatformEnum.ANDROID;
		 } else if (this.platform.is(DevicePlatformEnum.PHABLET)) {
			 deviceType = DevicePlatformEnum.PHABLET;
		 } else if (this.platform.is(DevicePlatformEnum.TABLET)) {
			 deviceType = DevicePlatformEnum.TABLET;
		 } else if (this.platform.is(DevicePlatformEnum.CORDOVA)) {
			 deviceType = DevicePlatformEnum.CORDOVA;
		 } else if (this.platform.is(DevicePlatformEnum.CAPACITOR)) {
			 deviceType = DevicePlatformEnum.CAPACITOR;
		 } else if (this.platform.is(DevicePlatformEnum.PWA)) {
			 deviceType = DevicePlatformEnum.PWA;
		 } else if (this.platform.is(DevicePlatformEnum.MOBILE)) {
			 deviceType = DevicePlatformEnum.MOBILE;
		 } else if (this.platform.is(DevicePlatformEnum.MOBILEWEB)) {
			 deviceType = DevicePlatformEnum.MOBILEWEB;
		 } else if (this.platform.is(DevicePlatformEnum.DESKTOP)) {
			 deviceType = DevicePlatformEnum.DESKTOP;
		 } else if (this.platform.is(DevicePlatformEnum.HYBRID)) {
			 deviceType = DevicePlatformEnum.HYBRID;
		 } else {
			 deviceType = DevicePlatformEnum.UNKNOWN;
		 }
		 return deviceType;
	 }
 
	 /**
	  * @description Determines whether desktop view is
	  * @returns
	  */
	 isDesktopView() {
		 const deviceType = this.getDevicePlatform();
		 if (
			 deviceType === DevicePlatformEnum.TABLET ||
			 deviceType === DevicePlatformEnum.DESKTOP ||
			 deviceType === DevicePlatformEnum.IPAD ||
			 deviceType === DevicePlatformEnum.PHABLET
		 ) {
			 return true;
		 } else {
			 return false;
		 }
	 }
 
	 /**
	  * @description Determines whether screen width more than 1k is
	  * @returns
	  */
	 isScreenWidthMoreThan1K() {
		 const deviceWidth = this.platform.width();
 
		 if (parseInt(deviceWidth, 10) >= 1000) {
			 return true;
		 } else {
			 return false;
		 }
	 }
 
	 /**
	  * Determines whether large device in landscape view
	  * @returns
	  */
	 isLargeDeviceInLandscapeView() {
		 const deviceType = this.getDevicePlatform();
 
		 if (
			 deviceType === DevicePlatformEnum.DESKTOP ||
			 (deviceType === DevicePlatformEnum.PHABLET &&
				 this.platform.isLandscape()) ||
			 (deviceType === DevicePlatformEnum.TABLET &&
				 this.platform.isLandscape()) ||
			 (deviceType === DevicePlatformEnum.IPAD && this.platform.isLandscape())
		 ) {
			 return true;
		 } else {
			 return false;
		 }
	 }
 
	 /**
	  * @description Gets categorical platform
	  * @returns
	  */
	 getCategoricalPlatform() {
		 const deviceType = this.getDevicePlatform();
		 /* istanbul ignore else */
		 if (
			 deviceType === DevicePlatformEnum.IOS ||
			 deviceType === DevicePlatformEnum.IPHONE ||
			 deviceType === DevicePlatformEnum.IPAD
		 ) {
			 return DevicePlatformEnum.IOS;
		 } else if (
			 deviceType === DevicePlatformEnum.DESKTOP ||
			 deviceType === DevicePlatformEnum.TABLET
		 ) {
			 return DevicePlatformEnum.DESKTOP;
		 } else if (deviceType === DevicePlatformEnum.ANDROID) {
			 return DevicePlatformEnum.ANDROID;
		 } else if (
			 deviceType === DevicePlatformEnum.ANDROID ||
			 deviceType === DevicePlatformEnum.TABLET ||
			 deviceType === DevicePlatformEnum.DESKTOP
		 ) {
			 return DevicePlatformEnum.ANDROID;
		 } else {
			 return DevicePlatformEnum.UNKNOWN;
		 }
	 }
 
	 /**
	  * Determines whether desktop is
	  * @returns
	  */
	 isDesktop() {
		 if (this.platform.is(DevicePlatformEnum.DESKTOP)) {
			 return true;
		 } else {
			 return false;
		 }
	 }
 
	 /**
	  * Determines whether browser is safari
	  * @returns
	  */
 
	 isBrowserSafari() {
		 if (navigator.vendor &&
			 navigator.vendor.indexOf(DevicePlatformEnum.APPLE) > -1 &&
			 navigator.userAgent &&
			 navigator.userAgent.indexOf(DevicePlatformEnum.CRIOS) === -1 &&
			 navigator.userAgent.indexOf(DevicePlatformEnum.FXIOS) === -1) {
			 return true;
		 } else {
			 return false;
		 }
	 }
 
	 /**
	  * Determines MAC
	  * @returns
	  */
 
	 isMac() {
		 if (navigator.platform.toUpperCase().indexOf(DevicePlatformEnum.MAC) >= 0) {
			 return true;
		 } else {
			 return false;
		 }
	 }

	/**
	 * 
	 * @returns 
	 */
	isApp()
	{

		let deviceType = this.getDevicePlatform();

		//this.platformList = platforms.join(', ');

		if (
			deviceType === DevicePlatformEnum.PWA ||
			deviceType === DevicePlatformEnum.MOBILEWEB ||
			deviceType === DevicePlatformEnum.TABLET ||
			deviceType === DevicePlatformEnum.DESKTOP
		)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}
