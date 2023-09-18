import BaseAPI from '@scripts/api';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@scripts/api/types';
import { DocumentLinks } from "@scripts/api/contents/types";

class ContentsApi extends BaseAPI {
	protected endpoint = 'contents';

	readDocuments(): Promise<BaseResponse<DocumentLinks>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<DocumentLinks>>(`${this.endpoint}/legal-docs/`)
				.then((response: AxiosResponse<BaseResponse<DocumentLinks>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export const contentsApi = new ContentsApi();
