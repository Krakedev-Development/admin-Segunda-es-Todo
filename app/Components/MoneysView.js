import { Image, View } from "react-native";
import theme from "../theme/theme";
import { GOLD, SILVER } from "../theme/Images";
import StyledText from "../theme/StyledText";

export const MoneysView = ({ ligth, small, color, gold, silver }) => {
  //const { userInfo } = useContext(UsuarioContext);
  console.log("MONEDAS QUE ENTRAN: ", gold + " - " + silver);
  return (
    <View
      style={{
        flexDirection: small ? "column" : "row",
        justifyContent: small ? "center" : "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: ligth ? "transparent" : "black",
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          borderRadius: 50,
          margin: 1,
        }}
      >
        <StyledText
          fontFamily={theme.fonts.textBold}
          fontSize={small && 15}
          color={ligth ? "black" : "white"}
          style={{ marginHorizontal: 2 }}
        >
          {gold ? gold : 0}
        </StyledText>
        <Image
          source={GOLD}
          style={{
            width: 20,
            height: 20,
            resizeMode: "stretch",
            marginHorizontal: 3,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: ligth ? "transparent" : "black",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          borderRadius: 50,
          paddingHorizontal: 10,
          margin: 1,
        }}
      >
        <StyledText
          fontFamily={theme.fonts.textBold}
          fontSize={small && 15}
          color={ligth ? "black" : "white"}
          style={{ marginHorizontal: 2 }}
        >
          {silver ? silver : 0}
        </StyledText>
        <Image
          source={SILVER}
          style={{
            width: 20,
            height: 20,
            resizeMode: "stretch",
            marginHorizontal: 3,
          }}
        />
      </View>
    </View>
  );
};
