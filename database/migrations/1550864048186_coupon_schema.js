'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponSchema extends Schema {
  up() {
    this.create('coupons', (table) => {
      table.increments()
      table.string("name, 100").notNullable()
      table.decimal('discount', 12, 2).notNullable()
      table.dateTime('valid_from').defaultTo(this.fn.now())
      table.dateTime('valid_until')
      table.integer('quantity').defaultTo(1)

      table
        .enu('type', ['free', 'percent', 'currency'])
        .defaultTo('currency')
      table.boolean('recursive').defaultTo(false)
    })
  }
  down() {
    
  }
}

module.exports = CouponSchema
