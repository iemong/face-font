import { sum } from '~/assets/utils/sum'

it('sums up 2 numbers', () => {
    expect(sum(1, 1)).toBe(2)
    expect(sum(3, 12)).toBe(15)
})
