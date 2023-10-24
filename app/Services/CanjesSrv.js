import { getDatabase, onValue, ref } from "firebase/database";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const fetchRedeemDB = async () => {
  //console.log("globla",global.dbCon);
  const ordersRef = collection(global.dbCon, "orders");
  const SnapProducts = await getDocs(ordersRef);
  let OrdersArray = [];

  SnapProducts.forEach((doc) => {
    // console.log("doc", productosQuemados);
    OrdersArray.push({ ...doc.data(), id: doc.id });
  });
  //   console.log("canjesssSSSSSSSSSS:::::::::::", OrdersArray);

  return OrdersArray;
};

export const updateRedeemDB = async (id) => {
  const redeemRef = doc(global.dbCon, "orders", id);
  // const datosActualizados = {
  //   status: true,
  // };
  console.log("mi referencia del documento de canje::::::::::", redeemRef);
  updateDoc(redeemRef, datosActualizados)
    .then(() => {
      console.log("Documento actualizado correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar el documento:", error);
    });
};

export const fetchRedeemRealtimeDatabase = async () => {
  // const db = getDatabase();
  // const ref1 = ref(global.database, "__collections__/");
  // console.log("mi ref1 es--------->", ref1);
  // // Attach an asynchronous callback to read the data at our posts reference
  // ref1.on(
  //   "__collections__/orders",
  //   (snapshot) => {
  //     console.log(
  //       "mis valores>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
  //       snapshot.val()
  //     );
  //   },
  //   (errorObject) => {
  //     console.log("The read failed: " + errorObject.name);
  //   }
  // );

  // console.log("globla");
  const databaseRef = ref(global.database, "__collections__/orders");
  console.log("mi database es::::", databaseRef);
  onValue(databaseRef, (snapshot) => {
    console.log("mi snapshot>>>>>>>>>>>>>>>", snapshot);
    const data = snapshot.val();
    console.log("Datos de la base de datos:", data);
  });
};

export const fetchRedeemDB2 = async () => {
  //console.log("globla",global.dbCon);
  const ordersRef = collection(global.database, "orders");
  const SnapProducts = await getDocs(ordersRef);
  let OrdersArray = [];

  SnapProducts.forEach((doc) => {
    // console.log("doc", productosQuemados);
    OrdersArray.push({ ...doc.data(), id: doc.orderId });
  });
  console.log("canjesssSSSSSSSSSS:::::::::::", OrdersArray);

  return OrdersArray;
};
