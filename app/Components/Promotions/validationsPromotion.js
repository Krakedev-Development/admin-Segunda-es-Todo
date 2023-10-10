export const validaciones = (
    name,
    setErrorName,
    description,
    setErrorDescription,
    points,
    setErrorPoints,
    imageDB,
    setErrorImage
) => {

  let isValid = true;
  let isValidName;
  let isValidDescription
  let isValidPoints
  let isValidImage;

  isValidName = isNameValid(name, setErrorName);
  isValidDescription = isDescriptionValid(description,setErrorDescription);
  isValidPoints = isPointsValid(points, setErrorPoints)
  isValidImage = true;
  if (!imageDB) {
    setErrorImage("Es necesario subir una imagen");
    isValidImage = false;
  }
  isValid = (isValidName && isValidDescription && isValidPoints && isValidImage)
  return isValid;
}



const isNameValid = (name, setErrorName) =>{
  let isValidName = true;

  if (!name) {
    setErrorName("El campo nombre es obligatorio");
    isValidName = false;
  }

  if (!areLetter(name)) {
    setErrorName("No puede contener caracteres especiales");
    isValidName = false;
  }

  return isValidName;
}

const isDescriptionValid = (description,setErrorDescription) =>{
  let isValidDescription = true;

  if (!description) {
    setErrorDescription("El campo descripción es obligatorio");
    isValidDescription = false;
  }

  if (!areLetter(description)) {
    setErrorDescription("No puede contener caracteres especiales");
    isValidDescription = false;
  }

  return isValidDescription;
}

const isPointsValid = (points, setErrorPoints) =>{
  let isValidPoints = true;
  if (!points) {
    setErrorPoints("El valor de puntos no puede estar vacio");
    isValidPoints = false;
  }

  if(!areNumbers(points)){
    setErrorPoints("Solo se permiten numeros enteros");
    isValidPoints = false;
  }

  return isValidPoints;
}

const areLetter = (word) =>{
  let areStringLetter = true;
  //isLetter contiene un regex que verifica desde letras hasta caracteres considerados letras y espacios
  let isLetter = /^[\w\s\~+*$áéíóúÁÉÍÓÚüÜ]+$/;
  for(let eachLetter = 0; eachLetter<word.length; eachLetter ++){
      let letter = word.charAt(eachLetter)
      if(!isLetter.test(letter)){
          areStringLetter = false;
          break;
      }
  }
  return areStringLetter;
}

const areNumbers = (points) =>{
  let arePointsNumbers = false;
  const numbers = new RegExp('[0-9]+');
  (numbers.test(points))?arePointsNumbers = true : arePointsNumbers = false;
  return arePointsNumbers;
}