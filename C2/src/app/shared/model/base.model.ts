/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Base Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2021-05-18 08:54:25
 */

import { ErrorModel } from './error.model';
import { OperatingUserModel } from './operating-user.model';

export interface BaseModel extends OperatingUserModel{
	success ?: boolean;
	message ?: string;
  token ?: string;
  updatedLoggedInSessionId ?: string;
  tokenUpdated ?: boolean;
  data ?: any;
	error ?: ErrorModel;
}
