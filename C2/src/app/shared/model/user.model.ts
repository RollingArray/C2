/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2019-07-11 09:47:29
 * @modify date 2019-07-11 09:47:29
 * @desc [description]
 */
import { BaseModel } from './base.model';
import { SearchModel } from './search.model';

export interface UserModel extends BaseModel, SearchModel {
		userId ?: string;
    userFirstName ?: string;
    userLastName ?: string;
    userPassword ?: string;
    userEmail ?: string;
    userSecurityAnswer1 ?: string;
    userSecurityAnswer2 ?: string;
    userPlatform ?: string;
    userLoginType ?: string;
    userActivationCode ?: string;
    userPasswordResetCode ?: string;
}
