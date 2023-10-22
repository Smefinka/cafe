import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cartActions } from "../store/index";
function CartP({product}){
  
const dispatch = useDispatch();
const [quantityProduct, setQuantityProduct] = useState(product.quantity)
function handleUpdateCart(q){
    let quantityP = quantityProduct;
    if(q === 'minus'){
        quantityP = quantityProduct-1;
      if(quantityP === 0) {
        handleDelete()
      }else{
        setQuantityProduct(quantityP)
      }
       
    }else if(q === 'plus'){
         quantityP = quantityProduct+1;
        setQuantityProduct(quantityP)
    }
    dispatch(cartActions.updateCart({
        name: product.name,
        price: product.price,
        quantity: quantityP
      }));
}
function handleDelete(){
    dispatch(cartActions.deleteProduct({
        name: product.name,
        sumPrice: quantityProduct * product.price
      }));
}
  console.log(product['image'])
const handleBuy = () => {

}
    return(
        <>
          <tr>
                                    <td className="product__cart__item">
                                        <div className="product__cart__item__pic" style={{width: "36%" }}>
                                            <img src={product.image} style={{width: "90%", paddingTop: "10%"}} alt=""/>
                                        </div>
                                        <div className="product__cart__item__text">
                                            <h6>{product.name}</h6>
                                            <h5>$ {product.price}</h5>
                                        </div>
                                    </td>
                                    <td className="quantity__item">
                                        <div className="quantity">
                                            <div className="pro-qty"><span className="dec qtybtn" onClick={() => {handleUpdateCart('minus')}} >-</span>
                                                <input type="text" defaultValue={quantityProduct} value={quantityProduct} />
                                            <span className="inc qtybtn" onClick={() => {handleUpdateCart('plus')}}>+</span></div>
                                        </div>
                                    </td>
                                    <td className="cart__price">$ {quantityProduct * product.price}</td>
                                    <td><span className="btn btn-warning" onClick={handleDelete}>del</span></td>
                                </tr>
        </>
    )
}
export default CartP;