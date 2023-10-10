import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import imagen1 from "../../assets/Productos/Ceviche.png";
import imagen2 from "../../assets/Productos/Camaron.png";
import imagen3 from "../../assets/Productos/Agua.png";
import {
  ImagenLunchCategory,
  ImagenDrinksCategory,
  ImagenGiftsCategory,
} from "../theme/Images";

const productosQuemados = [
  {
    imagen: imagen1,
    nombre: "Ceviche completo",
    puntos: 100,
    cantidad: 1,
    codigo: "#54423445",
  },
  {
    imagen: imagen2,
    nombre: "Ceviche de camaron",
    puntos: 25,
    cantidad: 1,
    codigo: "#54412345",
  },
  {
    imagen: imagen3,
    nombre: "Agua",
    puntos: 150,
    cantidad: 1,
    codigo: "#54471238",
  },
  {
    imagen: imagen1,
    nombre: "Ceviche completo",
    puntos: 100,
    cantidad: 1,
    codigo: "#14423445",
  },
  {
    imagen: imagen2,
    nombre: "Ceviche de camaron",
    puntos: 25,
    cantidad: 1,
    codigo: "#24412345",
  },
  {
    imagen: imagen3,
    nombre: "Agua",
    puntos: 150,
    cantidad: 1,
    codigo: "#34471238",
  },
  {
    imagen: imagen1,
    nombre: "Ceviche completo",
    puntos: 100,
    cantidad: 1,
    codigo: "#44423445",
  },
  {
    imagen: imagen2,
    nombre: "Ceviche de camaron",
    puntos: 25,
    cantidad: 1,
    codigo: "#64412345",
  },
  {
    imagen: imagen3,
    nombre: "Agua",
    puntos: 150,
    cantidad: 1,
    codigo: "#74471238",
  },
];

const productsLunch = [
  {
    imagen: ImagenLunchCategory.ceviche,
    nombre: "Ceviche",
    puntos: 100,
    cantidad: 1,
    description: "Ceviche sencillo",
    codigo: "#2323565",
  },
  {
    imagen: ImagenLunchCategory.cevicheMixto,
    nombre: "Ceviche Jipijapa Mixto",
    puntos: 150,
    cantidad: 1,
    description: "Camarón y Pescado",
    codigo: "#1234567",
  },
  {
    imagen: ImagenLunchCategory.superBowl2Carnes,
    nombre: "Super Bowl Dos Carnes",
    puntos: 180,
    cantidad: 1,
    description: "Elije entre Cerdo, Pollo, Carne y Chuleta",
    codigo: "#2345678",
  },
  {
    imagen: ImagenLunchCategory.superBowlCerdo,
    nombre: "Super Bowl de Cerdo",
    puntos: 170,
    cantidad: 1,
    description: "Cerdo bien sazonado con maduro y frejol",
    codigo: "#3456789",
  },
  {
    imagen: ImagenLunchCategory.cevicheCamaron,
    nombre: "Ceviche Jipijapa de Camarón",
    puntos: 160,
    cantidad: 1,
    description: "Camarón, aguacate, pepino",
    codigo: "#4567891",
  },
  {
    imagen: ImagenLunchCategory.superBowPollo,
    nombre: "Super Bowl de Pollo",
    puntos: 100,
    cantidad: 1,
    description: "Bowl de Pollo con salsa",
    codigo: "#5678912",
  },
];

const productsDrinks = [
  {
    imagen: ImagenDrinksCategory.cervezaPilsener,
    nombre: "Cerveza Pilsener",
    puntos: 100,
    cantidad: 1,
    description: "Alcohol",
    codigo: "#2323565",
  },
  {
    imagen: ImagenDrinksCategory.sprite,
    nombre: "Sprite",
    puntos: 150,
    cantidad: 1,
    description: "Gaseosa",
    codigo: "#4567841",
  },
  {
    imagen: ImagenDrinksCategory.cocaCola,
    nombre: "Coca Cola",
    puntos: 180,
    cantidad: 1,
    description: "Gaseosa",
    codigo: "#1657513",
  },
  {
    imagen: ImagenDrinksCategory.fuztea,
    nombre: "Fuztea",
    puntos: 170,
    cantidad: 1,
    description: "Bebida",
    codigo: "#4876543",
  },
  {
    imagen: ImagenDrinksCategory.michelada,
    nombre: "Michelada",
    puntos: 160,
    cantidad: 1,
    description: "Alcohol",
    codigo: "#6575378",
  },
  {
    imagen: ImagenDrinksCategory.fanta,
    nombre: "Fanta",
    puntos: 160,
    cantidad: 1,
    description: "Gaseosa",
    codigo: "#6423187",
  },
];

const productsGifts = [
  {
    imagen: ImagenGiftsCategory.balon,
    nombre: "Balón",
    puntos: 100,
    cantidad: 1,
    description: "Deporte",
    codigo: "#2323565",
  },
  {
    imagen: ImagenGiftsCategory.tomatodos,
    nombre: "Tomatodos",
    puntos: 150,
    cantidad: 1,
    description: "Deporte",
    codigo: "#1234567",
  },
  {
    imagen: ImagenGiftsCategory.buzo,
    nombre: "Buzo",
    puntos: 180,
    cantidad: 1,
    description: "Ropa",
    codigo: "#2345678",
  },
  {
    imagen: ImagenGiftsCategory.mochila,
    nombre: "Mochila",
    puntos: 170,
    cantidad: 1,
    description: "Regalo",
    codigo: "#3456789",
  },
  {
    imagen: ImagenGiftsCategory.mochilaDeportiva,
    nombre: "Mochila Deportiva",
    puntos: 160,
    cantidad: 1,
    description: "Deporte",
    codigo: "#4567891",
  },
];

export const fetchProducts = async (fnProducts) => {
  //console.log("globla",global.dbCon);
  const productoRef = collection(global.dbCon, "products");
  const SnapProducts = await getDocs(productoRef);
  let ProductsArray = [];

  SnapProducts.forEach((doc) => {
    // console.log("doc", productosQuemados);
    ProductsArray.push(doc.data());
  });

  fnProducts(ProductsArray);
  console.log("productos:::::::::::", ProductsArray);
};

export const guardar = (producto) => {
  console.log(global.dbCon);
  const productRef = doc(global.dbCon, "Pedidos", producto.codigo);
  setDoc(productRef, producto);
};

export const guardar2 = (producto) => {
  console.log(global.dbCon);
  const productRef = collection(global.dbCon, "Pedidos");
  addDoc(productRef, producto);
};

export const consultar = async (fnsetPedidos) => {
  //console.log("globla",global.dbCon);
  const productoRef = collection(global.dbCon, "Pedidos");
  const SnapPedidos = await getDocs(productoRef);
  let PedidoArray = [];

  SnapPedidos.forEach((documento) => {
    console.log("doc", productosQuemados);
    PedidoArray.push(productosQuemados.data());
  });

  fnsetPedidos(PedidoArray);
  console.log("pediFunc", PedidoArray);
};

export const consultarTest = async (fnsetPedidos) => {
  fnsetPedidos(productosQuemados);
};

export const consultarProductosLunch = async (fnsetPedidos) => {
  fnsetPedidos(productsLunch);
};

export const consultarProductosDrinks = async (fnsetPedidos) => {
  fnsetPedidos(productsDrinks);
};

export const consultarProductosGifts = async (fnsetPedidos) => {
  fnsetPedidos(productsGifts);
};

export const consultarProducto = async () => {
  //console.log("globla",global.dbCon);
  const productoRef = collection(global.dbCon, "Producto");
  const SnapProductos = await getDocs(productoRef);
  let ProductosArray = [];
  SnapProductos.forEach((documento) => {
    console.log("doc", documento.data());
    ProductosArray.push(documento.data());
  });

  global.ListaProducto = ProductosArray;
  console.log("productoFunc", ProductosArray);
};

export const enviarPedidos = (pedido) => {
  const pedidoRef = doc(global.dbCon, "Pedidos", pedido.codigo);
  setDoc(pedidoRef, pedido);
};

export const CambiarProducto = (producto) => {
  console.log(global.dbCon);
  const productRef = doc(global.dbCon, "Producto", producto.id);
  setDoc(productRef, producto);
};

export const AddProduct = (producto) => {
  console.log(global.dbCon);
  const productRef = doc(global.dbCon, "Producto", producto.id);
  setDoc(productRef, producto);
};

export const consultarUnPedido = async (id, fnsetObj) => {
  //console.log("globla",global.dbCon);
  const productoRef = doc(global.dbCon, "Pedidos", id);
  const docSnap = await getDoc(productoRef);
  console.log("dsfdsfdfdsfdsfds", docSnap.data());

  let PedidoObj = {};
  PedidoObj = docSnap.data();
  fnsetObj(PedidoObj);
  // console.log("productoFunc", PedidoObj);
};

export const consultarProcesado = async (fnsetPedidos) => {
  // console.log("global--------------------------------",Id);
  // const productoRef = collection(global.dbCon, "Pedidos");
  const productoRef = query(
    collection(global.dbCon, "Pedidos"),
    where("StatusPedido", "==", true)
  );
  const SnapPedidos = await getDocs(productoRef);
  let PedidoArray = [];
  await SnapPedidos.forEach((documento) => {
    console.log("doc", documento.data());

    console.log("doce-------------------", documento.data());
    PedidoArray.push(documento.data());
  });

  fnsetPedidos(PedidoArray);
  console.log("pediFunc2", PedidoArray);
};

export const consultarNoProcesado = async (fnsetPedidos) => {
  // console.log("global--------------------------------",Id);
  // const productoRef = collection(global.dbCon, "Pedidos");
  const productoRef = collection(global.dbCon, "Activos");

  const SnapPedidos = await getDocs(productoRef);
  let PedidoArray = [];
  await SnapPedidos.forEach((documento) => {
    console.log("doc", documento.data());

    console.log("doce-------------------", documento.data());
    PedidoArray.push(documento.data());
    console.log("ARRAY DENTRO SRT");
  });

  fnsetPedidos(PedidoArray);
  console.log("pediFunc2", PedidoArray);
};

export const CambiarPedidoNoProcesado = (PedidoAux) => {
  console.log(global.dbCon);
  console.log("-----------------------pediAux", PedidoAux);
  const productRef = doc(global.dbCon, "Pedidos", PedidoAux.id);
  setDoc(productRef, PedidoAux);
};
