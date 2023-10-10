import {
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export const guardarCliente = (cliente) => {
  console.log(global.dbCon);
  const clienteRef = doc(global.dbCon, "Pedidos", cliente.codigo);
  setDoc(clienteRef, cliente);
};
export const consultarClientes = async (fnsetCliente) => {
  const productoRef = collection(global.dbCon, "users");
  const snapPedidos = await getDocs(productoRef);
  let ClienteArray = [];
  snapPedidos.forEach((doc) => {
    ClienteArray.push(doc.data());
  });
  fnsetCliente(ClienteArray);
};

export const EliminarCliente = async (id, fnsetCliente, Clientes) => {
  const updatedCliente = Clientes.filter(
    (service) => service.identificacion !== id
  );

  fnsetCliente(updatedCliente);
  console.log("------------------------------", id);
  await deleteDoc(doc(global.dbCon, "Usuarios", id));

  console.log(
    "------------------------------------------------funcion eliminada",
    updatedCliente
  );
};
