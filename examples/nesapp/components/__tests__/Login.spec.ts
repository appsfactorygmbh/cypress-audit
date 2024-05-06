import Login from '@/pages/login.vue'
import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, beforeEach } from 'vitest'
import userState from '../../store/user'
import { fireEvent, screen } from '@testing-library/vue'

describe('Login', () => {
  const router = useRouter()

  const credentials = {
    username: 'test',
    password: 'password',
  }
  const fetchSpy = vi.spyOn(global, '$fetch')
  const routerPushSpy = vi.spyOn(router, 'push').mockResolvedValue()

  beforeEach(() => {
    userState.value.user = null
    vi.clearAllMocks()
  })

  describe('Testing with mountSuspended', () => {
    describe('On Submitting the login form', () => {
      let loginFormComponent: any
      beforeEach(async () => {
        const component = await mountSuspended(Login)
        loginFormComponent = component.findComponent({
          name: 'LoginForm',
        })
      })
      describe('On success', () => {
        beforeEach(async () => {
          fetchSpy.mockResolvedValueOnce({ ok: true })
          loginFormComponent.vm.$emit('submit', credentials)
        })

        it('should call the api with the login credentials', async () => {
          expect(fetchSpy).toHaveBeenCalledWith('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          })
        })

        it('should redirect to the dashboard', async () => {
          expect(routerPushSpy).toHaveBeenCalledWith('/')
        })

        it('should set the user in the store', async () => {
          expect(userState.value.user).toEqual({
            username: credentials.username,
          })
        })

        it('should not show an error message', async () => {
          const props = loginFormComponent.props()
          expect(props.errorMessage).toBeNull()
        })
      })

      describe('On failure', () => {
        beforeEach(async () => {
          fetchSpy.mockRejectedValueOnce({ ok: false })
          loginFormComponent.vm.$emit('submit', credentials)
        })

        it('should show an error message', async () => {
          const props = await loginFormComponent.props()
          expect(props.errorMessage).toBe('Login failed')
        })

        it('should not redirect to the dashboard', async () => {
          expect(routerPushSpy).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('Testing with renderSuspended', () => {
    describe('On Submitting the login form', () => {
      let userNameInput: HTMLElement
      let passwordInput: HTMLElement
      let button: HTMLElement

      beforeEach(async () => {
        await renderSuspended(Login)
        userNameInput = screen.getByLabelText(/Username/i)
        passwordInput = screen.getByLabelText(/Password/i)
        button = screen.getByRole('button', { name: /Login/i })
      })

      const fireEvents = async () => {
        await fireEvent.update(userNameInput, credentials.username)
        await fireEvent.update(passwordInput, credentials.password)
        await fireEvent.click(button)
      }

      describe('On success', () => {
        beforeEach(async () => {
          fetchSpy.mockResolvedValueOnce({ ok: true })
          await fireEvents()
        })

        it('should call the api with the login credentials', async () => {
          expect(fetchSpy).toHaveBeenCalledWith('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          })
        })

        it('should redirect to the dashboard', async () => {
          expect(routerPushSpy).toHaveBeenCalledWith('/')
        })

        it('should set the user in the store', async () => {
          expect(userState.value.user).toEqual({
            username: credentials.username,
          })
        })

        it('should not show an error message', async () => {
          const errorMessage = screen.queryByText(/Login failed/i)
          expect(errorMessage).toBeFalsy()
        })
      })

      describe('On failure', () => {
        beforeEach(async () => {
          fetchSpy.mockRejectedValueOnce({ ok: false })
          await fireEvents()
        })

        it('should show an error message', async () => {
          const errorMessage = await screen.getByText(/Login failed/i)
          expect(errorMessage).toBeTruthy()
        })

        it('should not redirect to the dashboard', async () => {
          expect(routerPushSpy).not.toHaveBeenCalled()
        })
      })
    })
  })
})
