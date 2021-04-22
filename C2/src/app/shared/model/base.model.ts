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
