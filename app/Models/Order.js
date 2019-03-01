'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    /**
     * Relacionamento entre o pedido e os items
     */
    items() {
        return this.hasMany('App/Models/OrderItem')
    }
}

module.exports = Order
