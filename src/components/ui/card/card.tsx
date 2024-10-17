import React, { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Icon1 from "../../../../public/icon-decrement-quantity.svg";
import Icon2 from "../../../../public/icon-increment-quantity.svg";

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

interface CardProps {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productName: string) => void;
  quantity: number;
}

const Card: React.FC<CardProps> = ({
  image,
  name,
  category,
  price,
  addToCart,
  removeFromCart,
  quantity,
}) => {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); // Controla la cantidad en el carrito

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (quantity === 0) {
      setHovered(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({ image, name, category, price }, 1); // Añadir al carrito con una cantidad inicial de 1
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(name); // Eliminar del carrito
    if (quantity === 1) {
      setAddedToCart(false); // Si la cantidad es 0, volver a mostrar el botón "Add to Cart"
    }
  };

  return (
    <div className={styles.card}>
      <Image
        src={image.desktop}
        alt={name}
        width={1000}
        height={760}
        className={hovered == true ? styles.img2 : styles.img}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <div className={styles.containerButton}>
        {quantity > 0 || addedToCart ? (
          <button className={styles.button2} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <Icon1 className={styles.icon1} onClick={handleRemoveFromCart} />
            {quantity}
            <Icon2 className={styles.icon2} onClick={handleAddToCart} />
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={handleAddToCart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <MdOutlineAddShoppingCart className={styles.icon} />
            Add to Cart
          </button>
        )}
      </div>
      <div className={styles.containerDescription}>
        <p className={styles.p}>{category}</p>
        <h2 className={styles.h2}>{name}</h2>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
