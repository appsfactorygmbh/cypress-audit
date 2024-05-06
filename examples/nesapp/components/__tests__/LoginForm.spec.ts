import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('LoginForm', () => {
  describe('Tests with nuxt test utils - mountSuspended', () => {
    it('should mount the component with mountSuspended', async () => {
      const component = await mountSuspended(LoginForm, {
        props: {
          errorMessage: null,
        },
      })
      expect(component).toBeTruthy()
    })

    it('displays the error message', async () => {
      const component = await mountSuspended(LoginForm, {
        props: {
          errorMessage: 'Invalid credentials',
        },
      })

      component.find('.is-error').text().includes('Invalid credentials')
    })
  })

  describe('Tests with vue test utils - mount', () => {
    it('should mounted the component', () => {
      const component = mount(LoginForm, {
        props: {
          errorMessage: null,
        },
      })
      expect(component).toBeTruthy()
    })

    it('displays the error message', () => {
      const component = mount(LoginForm, {
        props: {
          errorMessage: 'Invalid credentials',
        },
      })

      component.find('.is-error').text().includes('Invalid credentials')
    })
  })

  describe('Tests with nuxt test utils (testing library) - renderSuspended', () => {
    it('should rendered the component with renderSuspended', async () => {
      const component = await renderSuspended(LoginForm, {
        props: {
          errorMessage: null,
        },
      })
      expect(component).toBeTruthy()
    })

    it('displays the error message', async () => {
      await renderSuspended(LoginForm, {
        props: {
          errorMessage: 'Invalid credentials',
        },
      })

      expect(screen.getByText(/Invalid credentials/i)).toBeTruthy()
    })
  })

  it('emits the form on submit', async () => {
    const userNameValue = 'test'
    const passwordValue = 'password'

    const component = await renderSuspended(LoginForm, {
      props: {
        errorMessage: 'Invalid credentials',
      },
    })

    const userNameInput = screen.getByLabelText(/Username/i)
    const passwordInput = screen.getByLabelText(/Password/i)
    const button = screen.getByRole('button', { name: /Login/i })

    await fireEvent.update(userNameInput, userNameValue)
    await fireEvent.update(passwordInput, passwordValue)
    await fireEvent.click(button)

    expect(component.emitted('submit')[0]).toEqual([
      {
        username: userNameValue,
        password: passwordValue,
      },
    ])
  })
})
