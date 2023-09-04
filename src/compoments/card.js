import React from "react";
import Image from "next/image";
import styles from "@/styles/Card.module.css";

export default function Card({ product }) {
  return (
    <div className={styles.test}>
      <div className={styles.card}>
        <img
          alt="No image is avalible"
          style={{ objectFit: "contain" }}
          src={
            "https://product-cdn.systembolaget.se/productimages/30492329/30492329_400.png"
          }
          width={72}
          height={128}
        />

        <info className={styles.info}>
          <h2>{product.name}</h2>
          <h3>{product.nameThin}</h3>
          <p>APK: {product.APK}</p>
          <p>Price: {product.price} sek</p>
          <p>Alcohol: {product.alcohol} %</p>
          <p>Stock: {product.stock}</p>
        </info>
      </div>
      <div className={styles.hidden}>
        <h2>Section {product.section}</h2>
        <h2>Shelf {product.shelf}</h2>
      </div>
    </div>
  );
}
