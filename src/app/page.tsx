"use client";
import React, { useState } from "react";
import redHat from 'next/font/google'
import Card from "../components/ui/card/card";
import styles from "../components/ui/card/card.module.css";
import RigthBar from "../components/ui/rigthbar/rigthbar";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const products = [
  {
    image: {
      thumbnail: "/image-waffle-thumbnail.jpg",
      mobile: "/image-waffle-mobile.jpg",
      tablet: "/image-waffle-tablet.jpg",
      desktop: "/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "/image-creme-brulee-thumbnail.jpg",
      mobile: "/image-creme-brulee-mobile.jpg",
      tablet: "/image-creme-brulee-tablet.jpg",
      desktop: "/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "/image-macaron-thumbnail.jpg",
      mobile: "/image-macaron-mobile.jpg",
      tablet: "/image-macaron-tablet.jpg",
      desktop: "/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "/image-tiramisu-thumbnail.jpg",
      mobile: "/image-tiramisu-mobile.jpg",
      tablet: "/image-tiramisu-tablet.jpg",
      desktop: "/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "/image-baklava-thumbnail.jpg",
      mobile: "/image-baklava-mobile.jpg",
      tablet: "/image-baklava-tablet.jpg",
      desktop: "/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "/image-meringue-thumbnail.jpg",
      mobile: "/image-meringue-mobile.jpg",
      tablet: "/image-meringue-tablet.jpg",
      desktop: "/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "/image-cake-thumbnail.jpg",
      mobile: "/image-cake-mobile.jpg",
      tablet: "/image-cake-tablet.jpg",
      desktop: "/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "/image-brownie-thumbnail.jpg",
      mobile: "/image-brownie-mobile.jpg",
      tablet: "/image-brownie-tablet.jpg",
      desktop: "/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "/image-panna-cotta-thumbnail.jpg",
      mobile: "/image-panna-cotta-mobile.jpg",
      tablet: "/image-panna-cotta-tablet.jpg",
      desktop: "/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

const ProductList: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Asegurarse de incluir la imagen del producto en el item del carrito
        return [...prevItems, { ...product, quantity }];
      }
    });
  };  

   const removeFromCart = (productName: string) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.name === productName) {
            if (item.quantity > 1) {
              // Si la cantidad es mayor a 1, resta 1
              return { ...item, quantity: item.quantity - 1 };
            } else {
              // Si la cantidad es 1, eliminar el producto
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null); // Filtra los elementos que son nulos (productos eliminados)
    });
  };

  return (
    <>
      <div className={styles.container}>
        {products.map((product, index) => {
          const cartItem = cartItems.find((item) => item.name === product.name);
          const quantityInCart = cartItem ? cartItem.quantity : 0; // Cantidad en el carrito o 0
          return (
            <Card
              key={index}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              quantity={quantityInCart}
            />
          );
        })}
      </div>
      <RigthBar cartItems={cartItems} removeFromCart={removeFromCart} />
    </>
  );
};

export default ProductList;
