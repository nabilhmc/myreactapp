export const loadCartData = () => {
    return (dispatch) => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        dispatch({ type: 'LOAD_CART_DATA', payload: cartData });
      }
    };
  };
  
  export const addToCart = (product) => {
    return (dispatch, getState) => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
  
      // Save updated cart data to local storage
      const { cart } = getState();
      localStorage.setItem('cart', JSON.stringify(cart.products));
    };
  };