/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Base Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2021-04-29 11:20:18
 */

import { ErrorModel } from './error.model';

export interface BaseModel {
	userId ?: string;
	success ?: boolean;
	message ?: string;
  token ?: string;
  updatedLoggedInSessionId ?: string;
  tokenUpdated ?: boolean;
  data ?: any;
	error ?: ErrorModel;
}
