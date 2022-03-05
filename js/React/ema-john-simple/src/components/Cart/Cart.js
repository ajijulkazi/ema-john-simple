import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {Cart}=props;
    
    let totalQuantity= 0;
    let total=0;
    for(const product of Cart){
        if(!product.quantity){
            product.quantity=1;
        }
        total=total+product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }
    const shipping = total>0? 8.5 : 0;
    const totalPriceBeforeTax=total+shipping;
    const tax =(total)*.10;
    const grandTotal=total+shipping+tax;
    
    return (
        <div className='cart-container'>
            <h2>Order summary</h2>
            <h3>Items Ordered:{totalQuantity}</h3>
            <p>Items Price:${total.toFixed(2)}</p>
            <p>Shipping & Handling:${shipping}</p>
            <p>Total before Tax:${totalPriceBeforeTax.toFixed(2)}</p>
            <p>Estimated Tax:${tax.toFixed(2)}</p>
            <p className='G-total'>Grand Total:${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;