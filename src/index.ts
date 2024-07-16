import { fromHono } from 'chanfana'
import { Hono } from 'hono'
import { EmailCreate } from './endpoints/emailCreate'
import { EmailFetch } from './endpoints/emailFetch'

const app = new Hono()

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: '/',
})

openapi.get('/api/emails/:username', EmailFetch)
openapi.post('/api/emails', EmailCreate)

export default app
