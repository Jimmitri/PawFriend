import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const obtenerMascotas = async () => {
      try {
        const q = query(collection(db, "mascotas"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);

        const mascotas = querySnapshot.docs.map((doc) => ({
          firebaseId: doc.id,
          ...doc.data()
        }));

        setProductos(mascotas);
      } catch (error) {
        console.error("Error al cargar mascotas:", error);
        setProductos([]);
      }
    };

    obtenerMascotas();
  }, []);

  const addCarrito = (id) => {
    const check = carrito.every((item) => item.id !== id);

    if (check) {
      const data = productos.filter((producto) => producto.id === id);
      setCarrito([...carrito, ...data]);
    }
  };

  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem("dataCarrito"));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCarrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const getTotal = () => {
      const res = carrito.reduce((prev, item) => {
        return prev + ((item.price || 0) * (item.cantidad || 0));
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [carrito]);

  const value = {
    productos: [productos],
    menu: [menu, setMenu],
    addCarrito: addCarrito,
    carrito: [carrito, setCarrito],
    total: [total, setTotal]
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};

