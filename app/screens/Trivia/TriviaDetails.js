import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import StyledText from "../../theme/StyledText";
import theme from "../../theme/theme";
import { RadioButton, TextInput } from "react-native-paper";
import axios from "axios";
import { Icon } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { updateDinamicDocument } from "../../Services/firebase";
import { uploadDinamicImage } from "../../Services/ImagesSrv";

export const TriviaDetails = ({ route, navigation }) => {
  const { trivia } = route.params;
  const { setRefresh, refresh } = route.params;
  //   const newTrivia = Array.isArray(trivia.trivia) ? [...trivia.trivia] : [];

  //   // Agrega la nueva pregunta al arreglo
  //   newTrivia.push({ question: "Agregar nueva pregunta" });
  //   console.log(JSON.stringify({ ...trivia, trivia: newTrivia }));
  const [triviaForm, setTriviaForm] = useState(trivia);
  const [title, setTitle] = useState(trivia?.title);
  const [description, setDescription] = useState(trivia?.description);
  const [imageBackground, setImageBackground] = useState(trivia?.image);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [addNewQuestion, setAddNewQuestion] = useState(false);

  const pickImage = async (setImage) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    //setErrorImage("");
  };

  const AddQuestion = () => {
    const [questionForm, setQuestionForm] = useState({
      question: null,
      options: ["", "", "", ""],
      answer: null,
    });
    const [options, setOptions] = useState(["", "", "", ""]);
    const [checked, setChecked] = React.useState(null);
    const [image, setImage] = useState(null);

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta el comportamiento según la plataforma
      >
        <View
          style={{
            flex: 1,
            bottom: 13,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
            borderWidth: 0.5,
            borderTopStartRadius: 0,
            borderTopWidth: 0,
            borderTopEndRadius: 0,
            //paddingLeft: 5,
            padding: 5,
            borderRadius: 5,
          }}
        >
          {/* <View
            style={{
              backgroundColor: theme.colors.greySegunda,
              borderWidth: 0.8,
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 5,
              padding: 5,
              //borderWidth: 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                padding: 5,
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // Aquí puedes manejar la lógica para agregar una nueva pregunta
                }}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledText style={{ fontFamily: theme.fonts.textBold }}>
                  {triviaForm.trivia.length +
                    1 +
                    ".-" +
                    (questionForm?.question || "Nueva pregunta")}
                </StyledText>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{ padding: 5 }}>
            <TextInput
              value={questionForm?.question}
              multiline
              placeholder="Pregunta"
              onChangeText={(txt) => {
                //   const updatedTriviaForm = { ...triviaForm };
                //   updatedTriviaForm.trivia[index].question = txt;
                //   question.current = txt;
                //setTriviaForm(updatedTriviaForm);
                //setQuestion(txt);
                setQuestionForm({ ...questionForm, question: txt });
              }}
              label={"Descripción"}
              mode="outlined"
            />

            {/* <StyledText>Pregunta: {item.question}</StyledText> */}
            <View
              style={{
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: theme.ViewSize.width,
                  height: 200,
                  borderRadius: 5,
                  opacity: 0.7,
                }}
              />
              <TouchableOpacity
                onPress={() => pickImage(setImage)}
                style={{
                  position: "absolute",
                  top: "40%",
                  //left: "45%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="insert-photo"
                  type="MaterialIcons"
                  size={50}
                  color={theme.colors.greySegunda}
                />
                {!image && (
                  <StyledText style={{ top: "20%", opacity: 0.4 }}>
                    Pulsa para agregar una imagen
                  </StyledText>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <StyledText
                style={{ fontFamily: theme.fonts.textBold, marginBottom: 5 }}
              >
                Opciones de respuesta:
              </StyledText>

              <StyledText
                style={{
                  fontFamily: theme.fonts.textBold,
                  marginBottom: 5,
                }}
              >
                Correcta
              </StyledText>
            </View>

            {questionForm?.options.map((option, index) => {
              return (
                <View
                  key={index}
                  style={{ paddingVertical: 5, flexDirection: "row" }}
                >
                  <View style={{ flex: 4 }}>
                    {/* <StyledText
                        style={{
                          fontFamily: theme.fonts.textBold,
                          marginBottom: 5,
                        }}
                      >
                        Opción :{index + 1}
                      </StyledText> */}
                    <TextInput
                      value={questionForm?.options[index]}
                      multiline
                      onChangeText={(txt) => {
                        const updatedOptions = [...questionForm.options]; // Hacer una copia del array de opciones
                        updatedOptions[index] = txt; // Actualizar la opción en la copia
                        setQuestionForm({
                          ...questionForm,
                          options: updatedOptions,
                        }); // Actualizar el estado con la copia actualizada
                      }}
                      label={"Opción " + (index + 1) + " :"}
                      mode="outlined"
                      key={index}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton
                      value={questionForm?.options[index]}
                      status={
                        checked === questionForm?.options[index]
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        setChecked(questionForm?.options[index]);

                        setQuestionForm({
                          ...questionForm,
                          answer: questionForm?.options[index],
                        });
                      }}
                    />
                  </View>
                </View>
              );
            })}
            <StyledText
              style={{ fontFamily: theme.fonts.textBold, marginVertical: 5 }}
            >
              Respuesta: {questionForm?.answer}
            </StyledText>
            <View
              style={{
                flex: 1,
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let newTriviaData = [...triviaForm.trivia];
                  newTriviaData.push({ ...questionForm, image: image });
                  console.log(JSON.stringify(questionForm, null, 2));
                  setTriviaForm({ ...triviaForm, trivia: newTriviaData });
                  setAddNewQuestion(false);
                  Alert.alert("Pregunta añadida", "Pregunta añadida");
                  //setSelectedItemIndex(null);
                }}
                style={{
                  padding: 10,
                  backgroundColor: theme.colors.orangeSegunda,
                  flex: 1,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledText
                  color={"white"}
                  style={{ fontFamily: theme.fonts.textBold }}
                >
                  Confirmar
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAddNewQuestion(false);
                }}
                style={{
                  padding: 10,
                  backgroundColor: theme.colors.blackSegunda,
                  marginHorizontal: 5,
                  flex: 1,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledText
                  color={"white"}
                  style={{ fontFamily: theme.fonts.textBold }}
                >
                  Cancelar
                </StyledText>
              </TouchableOpacity>
            </View>
            {/* <StyledText>Mensaje perdedor: {item.messageFailed}</StyledText>
              <StyledText>Mensaje ganador: {item.messageWin}</StyledText> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  const QuestionList = ({ item, index }) => {
    console.log("ESTO ES DE ITEM: ", item);
    const [questionForm, setQuestionForm] = useState(item);
    const [options, setOptions] = useState([...item?.options]);
    const [checked, setChecked] = React.useState(item?.answer);
    const [image, setImage] = useState(item.image);

    useEffect(() => {
      setQuestionForm(item);
      console.log("ESTO ESTA EN TRIVIAFORM ACTUAL: ", triviaForm);
    }, [triviaForm]);
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta el comportamiento según la plataforma
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor:
                selectedItemIndex === index
                  ? theme.colors.orangeSegunda
                  : theme.colors.greySegunda,
              borderWidth: 0.5,
              paddingVertical: 10,
              marginTop: 10,
              borderRadius: 5,
              padding: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                padding: 5,
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // Aquí puedes manejar la lógica para agregar una nueva pregunta
                }}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 5,
                }}
              >
                <StyledText
                  color={selectedItemIndex === index ? "white" : "black"}
                  style={{ fontFamily: theme.fonts.textBold }}
                >
                  {index + 1 + ".-" + questionForm?.question}
                </StyledText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1.1,
                flexDirection: "row",
                //backgroundColor: "green",
                padding: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (selectedItemIndex === index) {
                    // Si ya está seleccionado, deselecciónalo
                    setSelectedItemIndex(null);
                  } else {
                    setSelectedItemIndex(index); // Establece el índice seleccionado
                  }
                }}
                style={{
                  flex: 0.5,
                  margin: 5,
                  borderRadius: 5,
                  justifyContent: "center",
                  padding: 5,
                  alignItems: "center",
                  backgroundColor: "green",
                }}
              >
                <Icon
                  name={selectedItemIndex === index ? "closecircleo" : "edit"}
                  type={
                    selectedItemIndex === index ? "ant-design" : "material-icon"
                  }
                  size={25}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let newTriviaData = [...triviaForm.trivia];
                  newTriviaData.splice(index, 1); // Elimina el elemento del array
                  setTriviaForm({ ...triviaForm, trivia: newTriviaData }); // Actualiza el estado de triviaForm
                  setSelectedItemIndex(null);
                }} // Establece el índice seleccionado
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  alignItems: "center",
                  backgroundColor: "red",
                }}
              >
                <Icon
                  name={"delete"}
                  type={"material-community"}
                  size={25}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
          {selectedItemIndex === index && ( // Muestra el componente solo si el índice coincide con el seleccionado
            <View style={{ padding: 5, paddingLeft: 20 }}>
              <TextInput
                value={questionForm?.question}
                //multiline
                onChangeText={(txt) => {
                  //   const updatedTriviaForm = { ...triviaForm };
                  //   updatedTriviaForm.trivia[index].question = txt;
                  //   question.current = txt;
                  //setTriviaForm(updatedTriviaForm);
                  //setQuestion(txt);
                  setQuestionForm({ ...questionForm, question: txt });
                }}
                label={"Descripción"}
                mode="outlined"
              />

              {/* <StyledText>Pregunta: {item.question}</StyledText> */}
              <View
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: theme.ViewSize.width,
                    height: 200,
                    borderRadius: 5,
                    opacity: 0.7,
                  }}
                />
                <TouchableOpacity
                  onPress={() => pickImage(setImage)}
                  style={{
                    position: "absolute",
                    top: "40%",
                    //left: "45%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="insert-photo"
                    type="MaterialIcons"
                    size={50}
                    color={theme.colors.greySegunda}
                  />
                  {!image && (
                    <StyledText style={{ top: "20%", opacity: 0.4 }}>
                      Pulsa para agregar una imagen
                    </StyledText>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <StyledText
                  style={{ fontFamily: theme.fonts.textBold, marginBottom: 5 }}
                >
                  Opciones de respuesta:
                </StyledText>

                <StyledText
                  style={{
                    fontFamily: theme.fonts.textBold,
                    marginBottom: 5,
                  }}
                >
                  Correcta
                </StyledText>
              </View>

              {questionForm?.options.map((option, index) => {
                return (
                  <View
                    key={index}
                    style={{ paddingVertical: 5, flexDirection: "row" }}
                  >
                    <View style={{ flex: 4 }}>
                      {/* <StyledText
                        style={{
                          fontFamily: theme.fonts.textBold,
                          marginBottom: 5,
                        }}
                      >
                        Opción :{index + 1}
                      </StyledText> */}
                      <TextInput
                        value={questionForm?.options[index]}
                        //multiline
                        onChangeText={(txt) => {
                          const updatedOptions = [...questionForm.options]; // Hacer una copia del array de opciones
                          updatedOptions[index] = txt; // Actualizar la opción en la copia
                          setQuestionForm({
                            ...questionForm,
                            options: updatedOptions,
                          }); // Actualizar el estado con la copia actualizada
                        }}
                        label={"Opción " + (index + 1) + " :"}
                        mode="outlined"
                        key={index}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton
                        value={options[index]}
                        status={
                          checked === options[index] ? "checked" : "unchecked"
                        }
                        onPress={() => {
                          setChecked(options[index]);
                          setQuestionForm({
                            ...questionForm,
                            answer: options[index],
                          });
                        }}
                      />
                    </View>
                  </View>
                );
              })}
              <StyledText
                style={{ fontFamily: theme.fonts.textBold, marginVertical: 5 }}
              >
                Respuesta: {questionForm?.answer}
              </StyledText>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    let newTriviaData = [...triviaForm.trivia];
                    newTriviaData[index] = { ...questionForm, image: image };
                    console.log(JSON.stringify(questionForm, null, 2));
                    setTriviaForm({
                      ...triviaForm,
                      trivia: newTriviaData,
                    });
                    setSelectedItemIndex(null);
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: theme.colors.orangeSegunda,
                    flex: 1,
                    marginHorizontal: 5,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledText
                    color={"white"}
                    style={{ fontFamily: theme.fonts.textBold }}
                  >
                    Confirmar
                  </StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItemIndex(null);
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: theme.colors.blackSegunda,
                    marginHorizontal: 5,
                    flex: 1,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledText
                    color={"white"}
                    style={{ fontFamily: theme.fonts.textBold }}
                  >
                    Cancelar
                  </StyledText>
                </TouchableOpacity>
              </View>
              {/* <StyledText>Mensaje perdedor: {item.messageFailed}</StyledText>
              <StyledText>Mensaje ganador: {item.messageWin}</StyledText> */}
            </View>
          )}
        </View>
        {index === triviaForm.trivia.length - 1 && (
          <View
            style={{
              backgroundColor: theme.colors.greySegunda,
              borderWidth: 0.5,
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 5,
              //borderBottomWidth: addNewQuestion ? 0 : 0.5,
              borderBottomStartRadius: addNewQuestion ? 0 : 5,
              borderBottomEndRadius: addNewQuestion ? 0 : 5,
              flex: 1,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // Aquí puedes manejar la lógica para agregar una nueva pregunta
              }}
              style={{
                backgroundColor: theme.colors.greySegunda,
                //borderWidth: 0.5,
                paddingVertical: 10,
                flex: 6,
                borderRadius: 5,

                padding: 5,
                flexDirection: "row",
              }}
            >
              <StyledText style={{ fontFamily: theme.fonts.textBold }}>
                {"Nueva pregunta"}
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddNewQuestion(!addNewQuestion)}
              style={{ flex: 1 }}
            >
              <Icon
                name="pluscircleo"
                type="ant-design"
                size={25}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        )}
        {addNewQuestion && <AddQuestion />}
      </KeyboardAvoidingView>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: Constants.statusBarHeight }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <Image
          source={{ uri: imageBackground }}
          style={{
            width: theme.ViewSize.maxWidth,
            height: 225,
            //marginVertical: 10,
            opacity: 0.7,
          }}
        />
        <TouchableOpacity
          onPress={() => pickImage(setImageBackground)}
          style={{
            position: "absolute",
            top: "40%",
            //left: "45%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="insert-photo"
            type="MaterialIcons"
            size={50}
            color={theme.colors.greySegunda}
          />
          {!imageBackground && (
            <StyledText style={{ top: "20%", opacity: 0.4 }}>
              Pulsa para agregar una imagen
            </StyledText>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            value={triviaForm.title}
            //placeholder="Título"
            onChangeText={(txt) => {
              setTriviaForm({ ...triviaForm, title: txt });
            }}
            multiline
            label={"Título"}
            mode="outlined"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            value={triviaForm.description}
            multiline
            onChangeText={(txt) => {
              setTriviaForm({ ...triviaForm, description: txt });
            }}
            //placeholder="Descripción"
            label={"Descripción"}
            mode="outlined"
          />
        </View>

        {/* <StyledText subtitle>{trivia.title}</StyledText> */}
        {/* <StyledText style={{ marginVertical: 5, fontSize: 17 }}>
          {trivia.description}
        </StyledText> */}
        <StyledText style={{ fontFamily: theme.fonts.textBold }}>
          Preguntas:{" "}
        </StyledText>
        {triviaForm.trivia.length > 0 ? (
          <FlatList
            data={triviaForm.trivia}
            renderItem={({ item, index }) => (
              <QuestionList item={item} index={index} />
            )}
          />
        ) : (
          <View>
            <View
              style={{
                backgroundColor: theme.colors.greySegunda,
                borderWidth: 0.5,
                paddingVertical: 10,
                marginVertical: 10,
                borderRadius: 5,
                //borderBottomWidth: addNewQuestion ? 0 : 0.5,
                borderBottomStartRadius: addNewQuestion ? 0 : 5,
                borderBottomEndRadius: addNewQuestion ? 0 : 5,
                flex: 1,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // Aquí puedes manejar la lógica para agregar una nueva pregunta
                }}
                style={{
                  backgroundColor: theme.colors.greySegunda,
                  //borderWidth: 0.5,
                  paddingVertical: 10,
                  flex: 6,
                  borderRadius: 5,

                  padding: 5,
                  flexDirection: "row",
                }}
              >
                <StyledText style={{ fontFamily: theme.fonts.textBold }}>
                  {"Nueva pregunta"}
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAddNewQuestion(!addNewQuestion)}
                style={{ flex: 1 }}
              >
                <Icon
                  name="pluscircleo"
                  type="ant-design"
                  size={25}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>
            {addNewQuestion && <AddQuestion />}
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={async () => {
              console.log("ESTO ES DEL FORMULARIO: ");
              console.log(JSON.stringify(triviaForm, null, 2));
              let image = imageBackground;
              if (imageBackground.startsWith("file")) {
                console.log("IMAGEN PRINCIPAL : ", imageBackground);
                try {
                  let imageUrl = await uploadDinamicImage(
                    imageBackground,
                    "principal"
                  );

                  // Actualiza la URL de la imagen en la copia del formulario
                  image = imageUrl;

                  // Aquí, también es posible que necesites actualizar la imagen en el objeto original (triviaForm) si es necesario.
                  // triviaForm.trivia[index].image = imageUrl;
                } catch (error) {
                  console.error("Error al cargar la imagen:", error);
                }
              }
              // Crea una copia del formulario para evitar modificar el original directamente
              const updatedTriviaForm = {
                ...triviaForm,
                points: triviaForm.trivia.length,
                image: image,
              };

              for (
                let index = 0;
                index < updatedTriviaForm.trivia.length;
                index++
              ) {
                const question = updatedTriviaForm.trivia[index];
                console.log("ESTA ES LA IMAGEN A EVALUAR: ", question.image);

                if (question.image.startsWith("file")) {
                  console.log(
                    "IMAGEN DE LA PREGUNTA: " + question.question + " : ",
                    question.image
                  );
                  try {
                    let imageUrl = await uploadDinamicImage(
                      question.image,
                      updatedTriviaForm.id + "-" + index
                    );

                    // Actualiza la URL de la imagen en la copia del formulario
                    question.image = imageUrl;

                    // Aquí, también es posible que necesites actualizar la imagen en el objeto original (triviaForm) si es necesario.
                    // triviaForm.trivia[index].image = imageUrl;
                  } catch (error) {
                    console.error("Error al cargar la imagen:", error);
                  }
                }
              }

              // Imprime el formulario actualizado
              console.log("FORMULARIO ACTUALIZADO: ");
              console.log(JSON.stringify(updatedTriviaForm, null, 2));
              updateDinamicDocument(
                triviaForm.id,
                "trivias",
                updatedTriviaForm
              );
              Alert.alert(
                "Trivia actualizada exitosamente",
                "Tus cambios ya son efectivos"
              );
              setRefresh(!refresh);
              navigation.goBack();
            }}
            style={{
              fontFamily: theme.fonts.textBold,
              flex: 1,
              backgroundColor: theme.colors.orangeSegunda,
              padding: 15,
              marginVertical: 5,
              marginHorizontal: 5,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledText
              style={{ fontFamily: theme.fonts.textBold }}
              color={"white"}
            >
              Guardar
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              // console.log("ESTO ES DEL FORMULARIO: ");
              // console.log(JSON.stringify(triviaForm, null, 2));
              // updateDinamicDocument(triviaForm.id, "trivias", triviaForm);
              // Alert.alert(
              //   "Trivia actualizada exitosamente",
              //   "Tus cambios ya son efectivos"
              // );
              // setRefresh(!refresh);
              navigation.goBack();
            }}
            style={{
              fontFamily: theme.fonts.textBold,
              flex: 1,
              backgroundColor: theme.colors.blackSegunda,
              padding: 15,
              marginVertical: 5,
              marginHorizontal: 5,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledText
              style={{ fontFamily: theme.fonts.textBold }}
              color={"white"}
            >
              Cancelar
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
