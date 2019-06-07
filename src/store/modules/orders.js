import * as firebase from 'firebase'
import { truncate } from 'fs';
class Order {
    constructor(name, phone, productId, done = false, id = null) {
        this.name = name,
            this.phone = phone,
            this.productId = productId,
            this.done = done,
            this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload
        }
    },

    actions: {
        async createOrder({ commit, getters }, { name, phone, productId }) {
            const order = new Order(name, phone, productId)
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).push(order)
            } catch (error) {
                commit('setError', error.message)
                throw error

            }
        },
        async fetchOrders({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            const resultOrders = []
            try {
                const fbVal = await firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/orders`).once('value')
                const orders = fbVal.val()
                Object.keys(orders).forEach(key => {
                    const order = orders[key]
                    resultOrders.push(new Order(order.name, order.phone, order.productId, order.done, key))
                })
                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async markOrderDone({ commit }, payload) {
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/orders`).child(payload).update({ done: true })
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        }
    },

    getters: {
        undoneOrders(state) {
            return state.orders.filter(order => !order.done)
        },
        doneOrders(state) {
            return state.orders.filter(order =>  order.done)
        },
        orders(state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        }

    }
}