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
  
  export const fetchPredictions = async () => {
    const predictionsRef = collection(global.dbCon, "predictions");
    const snapPromotion = await getDocs(predictionsRef);
    let PromotionArray = [];
    snapPromotion.forEach((doc) => {
      PromotionArray.push(doc.data());
    });
    // console.log("comentarios?????????????", PromotionArray);
    // fnsetCliente(PromotionArray);
    return PromotionArray;
  };
  
  export const updatePredictionsDB = async (id, datosActualizados) => {
    const predictionsRef = doc(global.dbCon, "predictions", id);
  
    console.log("mi referencia del documento de canje::::::::::", predictionsRef);
    updateDoc(predictionsRef, datosActualizados)
      .then(() => {
        console.log("Documento actualizado correctamente.");
      })
      .catch((error) => {
        console.error("Error al actualizar el documento:", error);
      });
  };
  
  export const addPredictionDB = (prediction) => {
    // console.log(
    //   "lo que me llega de promotion=?????????????????????????????????",
    //   promotion
    // );
    const predictionsRef = doc(global.dbCon, "predictions", promotion.promotionId);
    setDoc(predictionsRef, prediction);
  };
  
  export const deletePrediction = (docId) => {
    try {
      console.log("Ejecución delete object ",docId)
    const docRef = doc(collection(global.dbCon, "predictions"), docId);
    console.log("que está pasando? "+docId)
    deleteDoc(docRef)
      .then(() => {
        console.log("Documento eliminado con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar el documento:", error);
      });
    } catch (error) {
      console.log("Error al eliminar",error)
    }
  };
  
  export const deleteImageStorage = (imageName) => {
    const storage = getStorage();
    const imageRef = ref(storage, imageName);
    deleteObject(imageRef)
      .then(() => {
        console.log("Imagen eliminada con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar la imagen:", error);
      });
  };
  