import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
const cart = <FontAwesomeIcon icon={faCartShopping} />;
import {useDispatch } from 'react-redux';
import { cartActions } from "../store/index";
import { toast } from 'react-toastify';


function Product({props}){
  const dispatch = useDispatch();
  function handleOnClick(e){
    e.preventDefault();
  console.log(e.target);
  dispatch(cartActions.addCart({
    id: props.id,
    image: props.image,
    name: props.name,
    price: props.price,
    quantity: 1
  }));
  toast.success(` ${props.name} in the cart 🛒!`);

  }


    return(
        <div className="col-sm-6 col-lg-4 all pizza">
            <div className="box">
              <div>
                <div className="img-box">
                  <img src={props['image']} alt="h1" />
                </div>
                <div className="detail-box">
                  <h5>
                  {props['name']}
                  </h5>
                  <p>
                  {props['description']}
                  </p>
                  <div className="options">
                    <h6>
                    $ {props['price']}

                    </h6>
                    <a href="" onClick={handleOnClick} style={{color: "white"}}>
                    {cart}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}
export default Product;