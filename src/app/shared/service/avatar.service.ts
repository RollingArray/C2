/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Avatar service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-08-06 18:48:55 
 * Last modified  : 2021-10-31 22:15:49
 */



import { Injectable } from '@angular/core';
import { Regex } from '../constant/regex.constant';
import { StringKey } from '../constant/string.constant';

@Injectable({
	providedIn: 'root'
})
export class AvatarService
{

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Instance variable								|
	 * -------------------------------------------------|
	 */

	/**
	* -------------------------------------------------|
	* @description										|
	* @Lifecycle hooks							|
	* -------------------------------------------------|
	*/

	/**
	 * Creates an instance of avatar service.
	 */
	constructor(

	) { }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods							|
	 * -------------------------------------------------|
	 */

	/**
	 * Descriptions avatar service
	 * @param userFirstName 
	 * @returns  
	 */
	avatar(userFirstName: string)
	{
		const firstLetter = userFirstName.charAt(0);
		const charA2D = Regex.AVATAR_A_D.test(firstLetter);
		const charE2H = Regex.AVATAR_E_H.test(firstLetter);
		const charI2L = Regex.AVATAR_I_L.test(firstLetter);
		const charM2P = Regex.AVATAR_M_P.test(firstLetter);
		const charQ2T = Regex.AVATAR_Q_T.test(firstLetter);
		const charU2 = Regex.AVATAR_U_Z.test(firstLetter);
		if (charA2D)
		{
			return StringKey.IMAGE_AVATAR_A;
		}
		else if (charE2H)
		{
			return StringKey.IMAGE_AVATAR_B;
		}
		else if (charI2L)
		{
			return StringKey.IMAGE_AVATAR_C;
		}
		else if (charM2P)
		{
			return StringKey.IMAGE_AVATAR_D;
		}
		else if (charQ2T)
		{
			return StringKey.IMAGE_AVATAR_E;
		}
		else if (charU2)
		{
			return StringKey.IMAGE_AVATAR_F;
		}
	}
}
