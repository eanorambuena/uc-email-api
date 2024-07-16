import { createClient } from '@supabase/supabase-js'

process.env.PUBLIC_SUPABASE_URL = 'https://vuskeafcpsdvuuemzqwl.supabase.co'
process.env.PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1c2tlYWZjcHNkdnV1ZW16cXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwOTA2MDgsImV4cCI6MjAzNjY2NjYwOH0.EspjBKQABg2wJ7lOvPK5y8cA15j5bcCDy0RntMPaIuA'

const publicSupabaseUrl = process.env.PUBLIC_SUPABASE_URL ?? ''
const publicSupabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY ?? ''
export const supabase = createClient(publicSupabaseUrl, publicSupabaseKey)

const emailDomains = ['uc.cl', 'estudiante.uc.cl', 'alumni.uc.cl']

export async function addEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('emails')
      .insert([{ email }])
    if (error) throw error
    return data
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export async function getEmailFromUsername(username: string) {
  try {
    const possibleEmails = emailDomains.map((domain) => `${username}@${domain}`)
    for (const email of possibleEmails) {
      const { data, error } = await supabase
        .from('emails')
        .select('email')
        .eq('email', email)
        .limit(1)
      if (error) throw error
      if (!data) continue
      return {
        username,
        email: data[0].email,
        domain: email.split('@')[1]
      }
    }
    return undefined
  }
  catch (error) {
    console.error(error)
    return null
  }
}
