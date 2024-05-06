import { z } from 'zod'
import { zh } from 'h3-zod'
import { isPasswordCorrect } from '@/server/services/auth'
import { defineEventHandler } from 'h3'
// TODO test with mock

export default defineEventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      username: z.string(),
      password: z.string(),
    }),
  )

  if (isPasswordCorrect(body.username, body.password)) {
    return {
      message: 'Logged in',
      token: btoa(`${body.username}:supersecure`),
    }
  }

  setResponseStatus(event, 401)
  return { message: 'Login failed' }
})
