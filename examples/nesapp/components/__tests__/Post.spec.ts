import { renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'

import { describe, it, expect } from 'vitest'
import PostComponent from '@/components/Post.vue'
import type { Post } from '@/server/store/posts'

describe('Post', () => {
  const post: Post = {
    id: 'abc',
    text: 'Test',
    createdAt: 'Test',
    username: 'Rolf',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('If it is the users post', () => {
    let editButton: HTMLElement
    let scrollSpy = vi.fn()
    let component: Awaited<ReturnType<typeof renderSuspended>>
    beforeEach(async () => {
      HTMLElement.prototype.scrollIntoView = scrollSpy
      component = await renderSuspended(PostComponent, {
        props: {
          post,
          isMyPost: true,
        },
      })
      editButton = screen.getByRole('button', { name: /\[edit\]/i })
    })

    it('should show the edit button', () => {
      expect(editButton).toBeTruthy()
    })

    describe('On Edit', () => {
      let textArea: HTMLElement
      beforeEach(async () => {
        await fireEvent.click(editButton)
        textArea = screen.getByRole('textbox')
      })

      it('should show the text area', () => {
        expect(textArea).toBeTruthy()
      })

      it('should scroll to the text area', () => {
        expect(scrollSpy).toHaveBeenCalled()
      })

      describe('On Submit', () => {
        let submitButton: HTMLElement
        beforeEach(async () => {
          submitButton = screen.getByRole('button', { name: /Save/i })
          await fireEvent.update(textArea, 'New Text')
          await fireEvent.click(submitButton)
        })

        it('should emit the updated post', () => {
          expect(component.emitted('edit')[0]).toEqual(['New Text'])
        })

        it('should disable editing afterwards', () => {
          const textAreaAfterSubmit = screen.queryByRole('textbox')
          expect(textAreaAfterSubmit).toBeFalsy()
        })
      })
    })
  })
})
