import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { Email } from '../types';

export class EmailCreate extends OpenAPIRoute {
	schema = {
		tags: ['Emails'],
		summary: 'Create a new Email',
		request: {
			body: {
				content: {
					'application/json': {
						schema: Email,
					},
				},
			},
		},
		responses: {
			'200': {
				description: 'Returns the created email',
				content: {
					'application/json': {
						schema: Email,
					},
				},
			},
		},
	};

	async handle(c) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const emailToCreate = data.body;

		// Implement your own object insertion here


		// return the new task
		return {
			email: emailToCreate,
		};
	}
}
