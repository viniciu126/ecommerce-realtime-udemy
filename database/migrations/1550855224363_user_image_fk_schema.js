'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserImageFkSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.foreign('image')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropForeign('image')
      table.dropColumn('image')
    })
  }
}

module.exports = UserImageFkSchema
