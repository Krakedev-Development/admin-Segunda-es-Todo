import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  stora,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

export const fetchPromotions = async () => {
  const promotionRef = collection(global.dbCon, "promotions");
  const snapPromotion = await getDocs(promotionRef);
  let PromotionArray = [];
  snapPromotion.forEach((doc) => {
    PromotionArray.push(doc.data());
  });
  // console.log("comentarios?????????????", PromotionArray);
  // fnsetCliente(PromotionArray);
  return PromotionArray;
};

export const updatePromotionDB = async (id, datosActualizados) => {
  const promotionRef = doc(global.dbCon, "promotions", id);

  console.log("mi referencia del documento de canje::::::::::", promotionRef);
  updateDoc(promotionRef, datosActualizados)
    .then(() => {
      console.log("Documento actualizado correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar el documento:", error);
    });
};

export const addPromotionDB = (promotion) => {
  // console.log(
  //   "lo que me llega de promotion=?????????????????????????????????",
  //   promotion
  // );
  const productRef = doc(global.dbCon, "promotions", promotion.promotionId);
  setDoc(productRef, promotion);
};

export const deletePromotion = (docId) => {
  const docRef = doc(collection(global.dbCon, "promotions"), docId);
  deleteDoc(docRef)
    .then(() => {
      console.log("Documento eliminado con éxito");
    })
    .catch((error) => {
      console.error("Error al eliminar el documento:", error);
    });
};

export const deleteImageStorage = (imageName) => {
  // const imageRef = ref(storage, 'images', imageName);
  const storage = getStorage();
  // console.log("hola :v");
  const imageRef = ref(storage, imageName);
  console.log("mi referencia de la iagen es:::::::::::::", imageRef);
  deleteObject(imageRef)
    .then(() => {
      console.log("Imagen eliminada con éxito");
    })
    .catch((error) => {
      console.error("Error al eliminar la imagen:", error);
    });
};
