'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('title', 100)
      table.string('description', 255)
      table.integer('image').unsigned()
      table.timestamps()
      table
        .foreign('image')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
