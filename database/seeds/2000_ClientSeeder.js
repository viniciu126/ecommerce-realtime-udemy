'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')

class ClientSeeder {
  async run() {
    const role = await Role.findBy('slug', 'client')
    const clients = await Factory.model('App/Models/User').createMany(10)
    await Promise.all(
      clients.map(async client => {
        await client.roles().attach([role.id])
      })
    )

    
  }
}

module.exports = ClientSeeder
