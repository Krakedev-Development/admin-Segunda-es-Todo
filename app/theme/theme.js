import { Dimensions } from "react-native";
let screen = Dimensions.get("window");
let widthScreen = screen.width;
let heightScreen = screen.height;

const theme = {
  colors: {
    blackSegunda: "#2E2E2E",
    whiteSegunda: "#F8F8F8",
    orangeSegunda: "#F25B0C",
    redSegunda: "#F32409",
    greySegunda: "#DEDEDE",
    greylow: "#f0f0f0",
    grey: "#7A7A7A",
    pink: "#FFC9AD",
    naranjaDegradadoSegunda:
      "linear-gradient(180deg, #FD5100 0%, #FEC20C 100%)",
  },
  fontSize: {
    body: 16,
    title: 40,
    subtitle: 25,
    sizeBar: 17,
    //CarScreen
    carProducts: 16,
    carButtons: 18,
    pointsCarProductos: 14,
    //Modals
    modalButtons: 20,
  },
  fonts: {
    main: "System",
    textItalic: "Lato_400Regular_Italic",
    text: "Lato_400Regular",
    textBold: "Lato_700Bold",
  },
  fontWeight: {
    bold: "700",
    bolder: "900",
    normal: "normal",
  },
  separation: {
    headSeparation: heightScreen * 0.033,
    horizontalSeparation: widthScreen * 0.055,
    userHorizontalSeparation: widthScreen * 0.035,
    cardSeparation: widthScreen * 0.43,
    cardheight: heightScreen * 0.28,
  },
  heightBar: {
    heightSize: heightScreen * 0.05,
  },
  screenSize: {
    width: widthScreen,
    height: heightScreen,
  },
  ViewSize: {
    width: widthScreen - widthScreen * 0.055 * 2,
    maxWidth: Dimensions.get("window").width,
  },
};
export default theme;
