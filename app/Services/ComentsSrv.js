import {
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export const fetchComents = async (fnsetCliente) => {
  const productoRef = collection(global.dbCon, "rating");
  const snapPedidos = await getDocs(productoRef);
  let ComentsArray = [];
  snapPedidos.forEach((doc) => {
    ComentsArray.push(doc.data());
  });
  // console.log("comentarios?????????????", ComentsArray);
  fnsetCliente(ComentsArray);
  return ComentsArray;
};

//   export const EliminarCliente = async (id, fnsetCliente, Clientes) => {
//     const updatedCliente = Clientes.filter(
//       (service) => service.identificacion !== id
//     );

//     fnsetCliente(updatedCliente);
//     console.log("------------------------------", id);
//     await deleteDoc(doc(global.dbCon, "Usuarios", id));

//     console.log(
//       "------------------------------------------------funcion eliminada",
//       updatedCliente
//     );
//   };
