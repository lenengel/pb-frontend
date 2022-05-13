// holds your root state
export const state = () => ({
  products: [],
  cart: [],
  availableProducts: [],
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
  updateAvailableProduct: (context, obj) => {
    context.commit('UPDATE_AVAILABLE_PRODUCT', obj);
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
    for(const product of products) {
      state.products.push( {
        id: product.product.id,
        priceRaw : product.product.price,
        title : product.product.title,
        image : process.env.storeUrl + product.product.image.formats.small.url,
        description: product.product.description,
        categories: product.product.categories,
        units: product.product.product_units.map(unit => { 
          return {name : unit.name, value: unit.weight}
        }),

        // ToDo: Check Cart 
        availableQuantity : product.quantity
      });
    }
  },
  UPDATE_AVAILABLE_PRODUCT: (state, obj) => {
    let product = state.products.find(product => product.id == obj.id);
    product["availableQuantity"] = obj.value;
    console.log("UPDATE_AVAILABLE_PRODUCT" , product)
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