import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [Products, setProducts]=useState([]);
    const [cart, setCart]=useState([]);
    const [displayProducts, setDisplayProducts]=useState([]);

    useEffect( ()=>{
        fetch('./Products.JSON')
        .then(res=>res.json())
        .then(data => {setProducts(data);
            setDisplayProducts(data);
        });
    },[])
    useEffect(()=>{
        if(Products.length){
            const savedCart=getStoredCart();
            const storedCart=[];
            for(const key in savedCart){
            const addedProduct = Products.find(product => product.key === key);
            if(addedProduct){
                const quantity=savedCart[key];
                addedProduct.quantity=quantity;
               // console.log(addedProduct);
                storedCart.push(addedProduct);
            }
            
        }

        setCart(storedCart);

    }
        
    },[Products])

    const handleAddToCart= (product) =>{
            const newCart=[...cart,product];
            setCart(newCart);
            addToDb(product.key);
    }
    const handleSearch=event=>{
        const searchText=event.target.value;
        const matcheProduct=Products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matcheProduct);
        console.log(matcheProduct.length);
    }
    return (
        <>
        <div>
            <div className="search-container">
                <input type="text" 
                onChange={handleSearch}
                placeholder='Search Product' />
            </div>
        </div>
        <div className='shop-container'>
            <div className="product-container">
                {
                    displayProducts.map(product=> <Product 
                        key={product.key}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        >

                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart Cart={cart}></Cart>
            </div>
        </div>
        </>
    );
};

export default Shop;