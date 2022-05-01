// holds your root state
export const state = () => ({
  products: [],
  cart: [],
})

// contains your actions
export const actions = {
  addToCart: (context, product) => {
    context.commit('ADD_TO_CART', product);
  },
  removeFromCart: (context, index) => {
    context.commit('REMOVE_FROM_CART', index);
  },
  initializeProducts: (context, products) => {
    context.commit('INITIALIZE_PRODUCTS', products)
  },
  updateQuantity: (context, obj) => {
    context.commit('UPDATE_QUANTITY', obj);
  },
}
// contains your mutations
export const mutations = {
  ADD_TO_CART: (state, product) => {
    state.cart.push(product);
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1);
  },
  INITIALIZE_PRODUCTS: (state, products) => {
    state.products = [];
    products.forEach(function (product) {
      state.products.push( {
        id: product.id,
        price : (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.attributes.price)),
        priceRaw : product.attributes.price,
        title : product.attributes.title,
        image : (product.attributes.image.data ? "http://localhost:1337" + product.attributes.image.data.attributes.formats.small.url : "~/assets/img/placeholder-image.png" ),
        description: product.attributes.description,
        categories: product.attributes.categories,
      });
    });
  },
  UPDATE_QUANTITY: (state, obj) => {
    state.cart[obj.index]["quantity"] = obj.value;
  },
}
// your root getters
export const getters = {
    getCart: state => state.cart,
    getProducts: state => state.products,
}