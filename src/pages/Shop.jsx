import { useSelector } from "react-redux";
import { useState } from "react";
import CartP from "../components/CartP";
import { cartActions } from "../store/index";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, get, update } from "firebase/database";
import { database } from "/src/API/firebase";
function Shop() {
  let products = false;
  let cart = useSelector((state) => state.cart.items);
const orders = JSON.stringify(cart);
  const cartPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user1 = useSelector(state => state.user)
  console.log(user1);
  const userName = useSelector((state) => state.user.displayName);
console.log(userName)
  const handleBuy = () => {
    toast.success(`Thank ${user1.name} for your order 🙌!`);
    console.log()
    const userRef = ref(database, `users/${user1.userId}`);
    const updateData = {
      cart: orders
    };
    console.log(updateData)
    update(userRef, updateData)
    dispatch(cartActions.clearCart());
    navigate("/");
  };
  console.log(handleBuy);
  // add elements from store to cart
  if (cart.length > 0) {
    products = true;

    console.log(cartPrice);
  }

  return (
    <>
      <section className="book_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Your cart</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && cart.map((item) => <CartP product={item} />)}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a>Total price: $ {cartPrice} </a>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn update__btn">
                    <a href="#">
                      <i className="fa fa-spinner"></i> Update cart{" "}
                    </a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 mx-auto text-center mt-3 mb-3">
                  <div className="sing">
                    <a onClick={handleBuy} className="btn btn-lg">
                      Buy
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="map_container ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80181.16691120605!2d16.880853497265637!3d51.096254900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc26f5110ab53%3A0x1693601190156265!2sPizza%20Hut%20Wroc%C5%82aw%20Wroclavia!5e0!3m2!1spl!2spl!4v1696787510747!5m2!1spl!2spl"
                  width="600"
                  height="450"
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Shop;
