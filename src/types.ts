import { DateTime, Str } from 'chanfana'
import { z } from 'zod'

export const Email = z.object({
	email: Str(),
	username: Str({ description: 'UC username', required: false }),
	domain: Str({ required: false })
})
