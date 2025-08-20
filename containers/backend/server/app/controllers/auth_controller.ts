import User from '#models/user'
import { loginValidator, signUpValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const reqBody = request.body()
    const { email, password } = await loginValidator.validate(reqBody)

    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    // Return the generated token
    response.safeStatus(200)
    response.send({
      status: true,
      message: '',
      data: {
        token,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    response.safeStatus(200)
    response.send('')
  }

  async signUp({ request, response }: HttpContext) {
    const reqBody = request.body()
    const { email, password, fullName } = await signUpValidator.validate(reqBody)
    await User.create({
      email,
      password,
      fullName: fullName ?? null,
    })

    response.safeStatus(200)
    response.send('')
  }
}
