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
  clearCart: (context) => {
    context.commit('CLEAR_CART');
  },
  initializeProducts: (context, products) => {
    context.commit('INITIALIZE_PRODUCTS', products)
  },
  updateQuantity: (context, obj) => {
    context.commit('UPDATE_QUANTITY', obj);
  },
  updateUnit: (context, obj) => {
    context.commit('UPDATE_UNIT', obj);
  },
}
// contains your mutations
export const mutations = {
  ADD_TO_CART: (state, product) => {
    state.cart.push(product);
  },
  SET_TOAST: (state, toast) => {
    state.toast = toast;
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1);
  },
  CLEAR_CART : (state) => {
    state.cart = [];
  },
  INITIALIZE_PRODUCTS: (state, products) => {
    state.products = [];
    products.forEach(function (product) {
      state.products.push( {
        id: product.id,
        price : (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.attributes.price)),
        priceRaw : product.attributes.price,
        title : product.attributes.title,
        image : (product.attributes.image.data ? process.env.storeUrl + product.attributes.image.data.attributes.formats.small.url : "~/assets/img/placeholder-image.png" ),
        description: product.attributes.description,
        categories: product.attributes.categories,
        units: product.attributes.product_units.data.map(unit => { return {name : unit.attributes.name, value: unit.attributes.weight}}),
      });
    });
  },
  UPDATE_QUANTITY: (state, obj) => {
    state.cart[obj.index]["quantity"] = obj.value;
  },
  UPDATE_UNIT: (state, obj) => {
    state.cart[obj.index]["unit"] = obj.value;
  },
}
// your root getters
export const getters = {
    getCart: state => state.cart,
    getProducts: state => state.products,
    getToast: state => state.toast,
    isAuthenticated: state => state.auth.loggedIn,
    loggedInUser: state => state.auth.user,
}