/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Encryption service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-01 17:08:03 
 * Last modified  : 2021-05-01 19:38:03
 */



import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class EncryptionService {

	private secretKey = this.generateRandomString(128);

	/**
	 * Creates an instance of encryption service.
	 */
	constructor() { }

	/**
	 * @description Generates random string
	 * @param length 
	 * @returns  
	 */
	generateRandomString(length: number) {
		let text = '';

		if (length > 1) {
			const possible =
				'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
			for (let i = 0; i < length; i++) {
				text += possible
					.charAt(Math.floor(Math.random() * possible.length))
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/\=/g, '');
			}
		}

		return text;
	}

	/**
	 * @description Base64s encode
	 * @param originalString 
	 * @returns  
	 */
	base64Encode(originalString: string) {
		const hash = CryptoJS.SHA256(originalString);

		const base64URL = hash
			.toString(CryptoJS.enc.Base64)
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/\=/g, '');

		return base64URL;
	}
	/**
	 * @description Base64s encode
	 * @param EncodedString
	 * @returns  
	 */
	encryptData(originalString: string, secretKey: string) {
		const encryptedString = CryptoJS.AES.encrypt(originalString.trim(), secretKey).toString();
		return encryptedString;
	}
	/**
	 * Decrypts data
	 * @param encryptedString 
	 * @returns  
	 */
	decryptData(encryptedString: string, secretKey: string) {
		const decryptedString = CryptoJS.AES.decrypt(encryptedString, secretKey).toString(CryptoJS.enc.Utf8);
		return decryptedString;
	}
}