import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BCrypt Adapter', () => {
  test('Should call Bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hasySpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hasySpy).toHaveBeenCalledWith('any_value', salt)
  })
})
