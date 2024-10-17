"use client";
import React from "react";
import { useState } from "react";
import styles from "./rigthbar.module.css";
import { SiGumtree } from "react-icons/si";
import Empty from "../../../../public/illustration-empty-cart.svg";
import OrderConfirmationModal from "./OrderConfirmationModal";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface RigthBarProps {
  cartItems: CartItem[];
}

interface RigthBarProps {
  cartItems: CartItem[];
  removeFromCart: (productName: string) => void;
}

const RigthBar: React.FC<RigthBarProps> = ({ cartItems, removeFromCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

    const handleConfirmOrder = () => {
      setIsModalOpen(true); // Abre el modal
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false); // Cierra el modal
    };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Cart ({totalItems})</h2>
      {totalItems === 0 ? (
        <div>
          <Empty className={styles.imgEmpty} alt="Empty" />
          <p className={styles.titleproduct}>
            You added items will appear here
          </p>
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className={styles.containerProduct}>
            <div className={styles.cartItem}>
              <p className={styles.itemName}>
                <strong>{item.name}</strong>
              </p>
              <div className={styles.containerPrice}>
                <p className={styles.quantity}>
                  <strong>x{item.quantity}</strong>
                </p>
                <p className={styles.itemPrice}>@${item.price.toFixed(2)}</p>
                <p className={styles.totalPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.name)}
            >
              X
            </button>
          </div>
        ))
      )}

      {totalItems > 0 && ( // Mostrar el total solo si hay items en el carrito
        <div className={styles.totalContainer}>
          <p className={styles.totalLabel}>Order Total:</p>
          <p className={styles.totalAmount}>${totalPrice}</p>
        </div>
      )}

      {totalItems > 0 && ( // Mostrar el botón solo si hay items en el carrito
        <>
          <p className={styles.p}>
            <SiGumtree /> This is a <strong>carbon-neutral</strong> delivery
          </p>
          <button className={styles.button} onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}

      <OrderConfirmationModal
        cartItems={cartItems}
        totalPrice={totalPrice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RigthBar;
