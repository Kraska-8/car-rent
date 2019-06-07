import * as firebase from 'firebase'

class Product {
    constructor(title, price, description, imageSrc = '', promo = false, id = null, ownerId) {
        this.title = title,
            this.price = price,
            this.description = description,
            this.imageSrc = imageSrc,
            this.promo = promo,
            this.id = id,
            this.ownerId = ownerId
    }
}

export default {
    state: {
        products: [
            // {
            //     id: 1,
            //     title: "Lexus ES",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: true,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide01.jpg"
            // },
            // {
            //     id: 2,
            //     title: "Volvo XC90",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: true,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide02.jpg"
            // },
            // {
            //     id: 3,
            //     title: "Mercedes-Benz V-Class",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: true,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide03.jpg"
            // },
            // {
            //     id: 4,
            //     title: "BMW X6",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: true,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/slide04.jpg"
            // },
            // {
            //     id: 5,
            //     title: "Toyota Corolla XRS",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: false,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/vehicle5.jpg"
            // },
            // {
            //     id: 6,
            //     title: "Toyota RAV4",
            //     price: 999,
            //     description:
            //         "Curabitur elementum, diam ut rhoncus venenatis, erat nulla dictum odio, id laoreet lacus sapien in ex. Etiam pellentesque sollicitudin nibh vel accumsan. Sed tempus eget tortor eget vehicula. Praesent gravida, diam sit amet venenatis vestibulum, diam odio elementum ex, sed feugiat nisl eros dapibus dolor.",
            //     promo: false,
            //     imageSrc:
            //         "http://www.templates-preview.com/bootstrap-templates/300111914/images/vehicle6.jpg"
            // }
        ]
    },
    mutations: {
        createProduct(state, payload) {
            state.products.push(payload)
        },
        loadProducts(state, payload) {
            state.products = payload
        },
        updateProduct(state, { title, price, id, description }) {
            const product = state.products.find(a => {
                return a.id == id
            })
            product.title = title
            product.price = price
            product.description = description
        }

    },

    actions: {
        async createProduct({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            const image = payload.image
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.price,
                    payload.description,
                    '',
                    payload.promo,
                    firebase.auth().currentUser.uid
                )
                const product = await firebase.database().ref('products').push(newProduct)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await firebase.storage().ref(`products/${product.key}.${imageExt}`).put(image)
                const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                await firebase.database().ref('products').child(product.key).update({ imageSrc })
                commit('setLoading', false)
                commit('createProduct', {
                    ...newProduct,
                    id: product.key,
                    imageSrc
                })
                console.log(product, imageSrc, newProduct);

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
        },
        async updateProduct({ commit }, { title, price, id, description }) {

            commit('clearError')
            commit('setLoading', true)
            try {
                await firebase.database().ref('products').child(id).update({
                    title,
                    price,
                    description
                }
                )
                commit('updateProduct', { title, price, id, description })
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
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
        myProducts(state, getters) {
            if (getters.isUserLoggedIn) {
                return state.products.filter(product => {
                    return product.ownerId == firebase.auth().currentUser.uid
                })
            }

        },
        productById(state) {
            return productId => {
                return state.products.find(product => product.id == productId)
            }
        }
    }
}