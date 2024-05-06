import { describe, expect, it } from 'vitest'
import { iconClassForUsername } from '../user-icon'

describe('iconClassForUsername', () => {
  it('provide the user expected icon', () => {
    const userName = 'lars'
    const expected = 'nes-mario'
    const actual = iconClassForUsername(userName)
    expect(actual).toBe(expected)
  })

  it('provide the user expected icon', () => {
    const userName = 'lars'
    const expected = 'nes-ash'
    const actual = iconClassForUsername(userName)
    expect(actual).not.toBe(expected)
  })

  it('provide the user expected icon', () => {
    const userName = 'rolf'
    const expected = 'nes-ash'
    const actual = iconClassForUsername(userName)
    expect(actual).toBe(expected)
  })

  it('provide the user expected icon', () => {
    const userName = 'roman'
    const expected = 'nes-pokeball'
    const actual = iconClassForUsername(userName)
    expect(actual).toBe(expected)
  })

  it('provide the user expected icon', () => {
    const userName = 'alex'
    const expected = 'nes-kirby'
    const actual = iconClassForUsername(userName)
    expect(actual).toBe(expected)
  })
})

describe('iconClassForUsername with test each', () => {
  /**
   * @param {string} userName
   * @param {string} expected
   */
  const testCases = [
    ['lars', 'nes-mario'],
    ['rolf', 'nes-ash'],
    ['roman', 'nes-pokeball'],
    ['alex', 'nes-kirby'],
    ['waldi', 'nes-charmander'],
    ['antfu', 'nes-bulbasaur'],
  ]

  it.each(testCases)(
    'username %s should be provided with icon %s',
    (userName, expected) => {
      const actual = iconClassForUsername(userName)
      expect(actual).toBe(expected)
    },
  )
})
