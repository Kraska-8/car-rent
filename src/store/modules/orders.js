import * as firebase from 'firebase'

class Order {
    constructor(productId, title, description, imageSrc) {
        this.productId = productId,
            this.title = title,
            this.description = description,
            this.imageSrc = imageSrc

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
        async makeFav({ commit, getters }, { productId, title, description, imageSrc }) {
            const order = new Order(productId, title, description, imageSrc)
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).push(order)
            } catch (error) {
                commit('setError', error.message)
                throw error

            }
        },
        async deleteFav({ commit, getters }, productId) {
            commit('clearError')
            console.log(productId);

            try {
                const orderD = await firebase.database().ref(`/users/${getters.user.id}/orders`).child(productId).remove();
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
                if (orders) {
                    Object.keys(orders).forEach(key => {
                        const order = orders[key]
                        resultOrders.push(new Order(order.productId, order.title, order.description, order.imageSrc))
                    })
                }

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
        orders(state) {
            if (state.orders) {
                return state.orders
            }
        },
        ordersCount(state) {
            if (state.orders) {
                return state.orders.length
            }
        },
        orderById(state) {
            return orderId => {
                return state.orders.find(order => order.productId == orderId)
            }
        }


    }
}