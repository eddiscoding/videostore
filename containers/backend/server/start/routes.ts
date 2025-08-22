/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/*
|--------------------------------------------------------------------------
| AUTHENTICATION ROUTES
|--------------------------------------------------------------------------
|
| All routes related to authentication, authorization and login
|
*/
const AuthController = () => import('#controllers/auth_controller')
router.post('/api/v1/auth/login', [AuthController, 'login'])
router.post('/api/v1/auth/signup', [AuthController, 'signUp'])
router
  .post('/api/v1/auth/logout', [AuthController, 'logout'])
  .use(middleware.auth({ guards: ['api'] }))
router
  .post('/api/v1/auth/refresh', [AuthController, 'refresh'])
  .use(middleware.auth({ guards: ['api'] }))

/*
|--------------------------------------------------------------------------
| HEALTHCHECK ROUTES
|--------------------------------------------------------------------------
|
| All routes related to healthchecks and metrics
|
*/
const HealthcheckController = () => import('#controllers/healthcheck_controller')
router.get('/api/v1/healthcheck/noauth', [HealthcheckController, 'ping'])
router
  .get('/api/v1/healthcheck/auth', [HealthcheckController, 'ping'])
  .use(middleware.auth({ guards: ['api'] }))
