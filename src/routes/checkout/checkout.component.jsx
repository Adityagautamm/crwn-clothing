import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../../components/cart-item/cart-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, addItemToCart, RemoveItemFromCart } =
    useContext(CartContext);
  return (
    <div>
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => RemoveItemFromCart(cartItem)}>
                decrement
              </span>
              <br />
              <span onClick={() => addItemToCart(cartItem)}>increment</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
