'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CuponProductSchema extends Schema {
  up () {
    this.create('cupon_product', (table) => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('coupon_id').unsigned()

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')
      
      table
        .foreign('coupon_id')
        .references('id')
        .inTable('coupons')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('cupon_product')
  }
}

module.exports = CuponProductSchema
