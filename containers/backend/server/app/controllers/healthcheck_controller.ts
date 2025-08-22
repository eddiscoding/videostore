import type { HttpContext } from '@adonisjs/core/http'

export default class HealthcheckController {
  async ping({ response }: HttpContext) {
    response.safeStatus(200)
    response.send('')
  }
}
