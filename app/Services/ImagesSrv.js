import {
  ref,
  uploadBytes,
  uploadString,
  put,
  getMetadata,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const SubirFoto = async (uri, id, fnsetUrl) => {
  const ImageRef = ref(
    global.storage,
    "SegundaEsTodo/promotions/" + id + ".jpeg"
  );

  console.log("______________________________ID:", id);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const uploadTask = uploadBytesResumable(ImageRef, blob);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        fnsetUrl(downloadURL);
      });
    }
  );
};

export const uploadDinamicImage = async (uri, id) => {
  const ImageRef = ref(global.storage, "SegundaEsTodo/trivias/" + id + ".jpeg");

  console.log("______________________________ID:", id);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(ImageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress events if needed
      },
      (error) => {
        // Handle upload errors
        reject(error);
      },
      async () => {
        // Handle successful upload
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
