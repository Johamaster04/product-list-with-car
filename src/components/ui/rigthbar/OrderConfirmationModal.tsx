"use client";
import React from "react";
import Modal from "react-modal";
import styles from "./OrderConfirmationModal.module.css";
import Confirm from "../../../../public/icon-order-confirmed.svg"
import Image from "next/image";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface OrderConfirmationModalProps {
  cartItems: CartItem[];
  totalPrice: string;
  onClose: () => void;
  isOpen: boolean;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  cartItems,
  totalPrice,
  onClose,
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Order Confirmation"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
          <Confirm className={styles.confirm} alt="confirm"/>         
        <h2 className={styles.modalTitle}>
          Order Confirmed
        </h2>
        <p className={styles.modalSubtitle}>We hope you enjoy your food!</p>
        {/*  */}
        <div className={styles.itemList}>
          {cartItems.map((item, index) => (
            <div className={styles.item} key={index}>
              
              <Image
                src={item.image.thumbnail}
                alt={item.name}
                width={1000}
                height={760}
                className={styles.itemImage}
              />
            
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>
                  {item.name}
                </p>
                <div className={styles.row}>
                  <p className={styles.quantity}>
                    <strong>x{item.quantity}</strong>
                  </p>
                  <p className={styles.itemPrice}>@${item.price.toFixed(2)}</p>
                </div>
              </div>

              <p className={styles.totalPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className={styles.totalContainer}>
            <p className={styles.totalLabel}>Order Total:</p>
            <p className={styles.totalAmount}>${totalPrice}</p>
          </div>
        </div>
        <button className={styles.newOrderButton} onClick={onClose}>
          Start New Order
        </button>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
