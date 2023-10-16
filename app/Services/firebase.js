import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  stora,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

export const fetchDinamicData = async (collectionName) => {
  const collectionRef = collection(global.dbCon, collectionName);
  const snapShot = await getDocs(collectionRef);
  let arrayData = [];
  snapShot.forEach((doc) => {
    try {
      arrayData.push({ ...doc.data(), ...{ id: doc.id } });
    } catch (error) {}
  });
  return arrayData;
};

export const updateDinamicDocument = async (id, collectionName, newData) => {
  const documentRef = doc(global.dbCon, collectionName, id);

  console.log("mi referencia del documento de canje::::::::::", documentRef);
  await updateDoc(documentRef, newData)
    .then(() => {
      console.log("Documento actualizado correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar el documento:", error);
    });
};

export const createDinamicDocument = async (id, collectionName, newData) => {
  // console.log(
  //   "lo que me llega de promotion=?????????????????????????????????",
  //   promotion
  // );
  const documentRef = doc(global.dbCon, collectionName, id);
  await setDoc(documentRef, newData)
    .then(() => {
      console.log("Documento creado correctamente.");
    })
    .catch((error) => {
      console.error("Error al crear el documento:", error);
    });
};

export const createDinamicDocumentWithinId = async (
  collectionName,
  newData
) => {
  // console.log(
  //   "lo que me llega de promotion=?????????????????????????????????",
  //   promotion
  // );
  const docRef = await addDoc(
    collection(global.dbCon, collectionName),
    newData
  );
  console.log("Document written with ID: ", docRef.id);
  await updateDoc(docRef, { id: docRef.id });
  newData.id = docRef.id;
  return newData;
};

export const deleteDocument = (id, collectionName) => {
  const docRef = doc(collection(global.dbCon, collectionName), id);
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
  // console.log("mi referencia de la iagen es:::::::::::::", imageRef);
  deleteObject(imageRef)
    .then(() => {
      console.log("Imagen eliminada con éxito");
    })
    .catch((error) => {
      console.error("Error al eliminar la imagen:", error);
    });
};
