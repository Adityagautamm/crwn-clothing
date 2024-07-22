import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../../components/cart-item/cart-item.component";

const Checkout = () => {
  const { cartItems, addItemToCart, MinusItemToCart } = useContext(CartContext);
  return (
    <div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div>
            <CartItem key={item.id} cartItem={item} />
            <span onClick={addItemToCart}>ADD</span>
            <br />
            <span onClick={MinusItemToCart}>SUBTRACT</span>
            <br />
            <span>Remove</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
