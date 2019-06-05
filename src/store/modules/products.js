import * as firebase from 'firebase'

class Product {
    constructor(title, price, description, imageSrc = '', promo = false, userId = null) {
        this.title = title,
            this.price = price,
            this.description = description,
            this.imageSrc = imageSrc,
            this.promo = promo,
            this.userId = userId
    }
}

export default {
    state: {
        products: [
            {
                id: 1,
                title: "Lexus ES",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: true,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide01.jpg"
            },
            {
                id: 2,
                title: "Volvo XC90",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: true,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide02.jpg"
            },
            {
                id: 3,
                title: "Mercedes-Benz V-Class",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: true,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide03.jpg"
            },
            {
                id: 4,
                title: "BMW X6",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: true,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide04.jpg"
            },
            {
                id: 5,
                title: "Toyota Corolla XRS",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: false,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/vehicle5.jpg"
            },
            {
                id: 6,
                title: "Toyota RAV4",
                price: 999,
                description:
                    "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
                promo: false,
                imageSrc:
                    "http://www.templates-preview.com/bootstrap-templates/300111914/images/vehicle6.jpg"
            }
        ]
    },
    mutations: {
        createProduct(state, payload) {
            state.products.push(payload)
        },
        loadProducts(state, payload) {
            state.products = payload
        }

    },

    actions: {
        async createProduct({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.price,
                    payload.description,
                    payload.imageSrc,
                    payload.promo,
                    getters.user.userId
                )
                const product = await firebase.database().ref('products').push(newProduct)
                commit('setLoading', false)
                commit('createProduct', {
                    ...newProduct,
                    id: product.key
                })

            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error

            }
        },
        async fetchProducts({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            const resultProducts = []
            try {
                const productList = await firebase.database().ref('products').once('value')
                const products = productList.val()
                Object.keys(products).forEach(key => {
                    const product = products[key]
                    resultProducts.push(
                        new Product(
                            product.title,
                            product.price,
                            product.description,
                            product.imageSrc,
                            product.promo,
                            key
                        )
                    )

                })
                commit('loadProducts', resultProducts)
                commit('setLoading', false)

            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
        }
    },

    getters: {
        products(state) {
            return state.products
        },
        promoProducts(state) {
            return state.products.filter(product => {
                return product.promo
            })
        },
        myProducts(state) {
            return state.products
        },
        productById(state) {
            return productId => {
                return state.products.find(product => product.id == productId)
            }
        }
    }
}