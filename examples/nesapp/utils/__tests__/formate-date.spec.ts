import { describe, expect, it, vi } from 'vitest'
import { formatDate } from '../format-date'

describe('formateDate', () => {
  it('should return the date string in the expected format', () => {
    const input = '1993-04-06T11:12:13.000Z'
    const expected = '06.04.1993 11:12'
    const actual = formatDate(input)
    expect(actual).not.toBe(expected)
  })

  it('should return the date string in the expected format', () => {
    const input = '1993-04-06T11:12:13.000Z'
    const expected = '06.04.1993 13:12'
    const actual = formatDate(input)
    expect(actual).toBe(expected)
  })
})
