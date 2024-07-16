import { Bool, OpenAPIRoute, Str } from 'chanfana'
import { z } from 'zod'
import { Email } from '../types'
import { getEmailFromUsername } from 'database'

export class EmailFetch extends OpenAPIRoute {
	schema = {
		tags: ['Emails'],
		summary: 'Get a single Email by UC username',
		request: {
			params: z.object({
				username: Str({ description: 'UC username' }),
			}),
		},
		responses: {
			'200': {
				description: 'Returns a single email if found',
				content: {
					'application/json': {
						schema: Email
					},
				},
			},
			'404': {
				description: 'Email not found',
				content: {
					'application/json': {
						schema: z.object({
							error: Str()
						}),
					},
				},
			},
		},
	}

	async handle(c) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>()

		// Retrieve the validated username
		const { username } = data.params

		// Implement your own object fetch here
		const email = await getEmailFromUsername(username)
		const exists = email !== undefined

		// @ts-ignore: check if the object exists
		if (exists === false) {
			return Response.json(
				{
					error: 'Object not found',
				},
				{
					status: 404,
				},
			)
		}

		return email
	}
}
