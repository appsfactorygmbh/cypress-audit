import { describe, expect, it, vi } from 'vitest'
import login from '../login'
import { H3Event } from 'h3'
import * as authServices from '../../services/auth'

vi.mock('h3-zod', () => {
  const zh = {
    useValidatedBody: vi.fn().mockReturnValue({
      username: 'lars',
      password: 'password',
    }),
  }
  return {
    zh,
  }
})

describe('Login', () => {
  const validateMock = vi.spyOn(authServices, 'isPasswordCorrect')
  const event = {
    some: 'thing',
  } as any as H3Event

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when the password is incorrect', () => {
    beforeEach(() => {
      validateMock.mockReturnValue(true)
    })

    it('should return the expected message and token', async () => {
      const actual = await login(event)
      expect(actual).toEqual({
        message: 'Logged in',
        token: 'bGFyczpzdXBlcnNlY3VyZQ==',
      })
    })

    describe('when the password is not correct', () => {
      beforeEach(() => {
        validateMock.mockReturnValue(false)
      })

      it('should return with login failed', async () => {
        const actual = await login(event)
        expect(actual).toEqual({ message: 'Login failed' })
      })
    })
  })
})
