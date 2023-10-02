import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import { FeedbackFormPayload } from "@scripts/api/forms/types";
import {objectToFormData} from "@scripts/utils/objectToFormData";

class FormsApi extends BaseAPI {
	protected endpoint = 'forms';

	sendFeedback(data: FeedbackFormPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data)

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/feedback/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const formsApi = new FormsApi();
