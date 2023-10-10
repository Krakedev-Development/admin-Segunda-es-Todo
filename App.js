import { useContext, useState } from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
//Import de screens
import { RedeemCode } from "./app/screens/ScreenNav/RedeemCodes";
import { Coments } from "./app/screens/ScreenNav/Coments";
import theme from "./app/theme/theme";
import { ListGroups } from "./app/screens/ScreenNav/Groups/ListGroups";
import { Groups } from "./app/screens/ScreenNav/Groups/Groups";
import { SupGroups } from "./app/screens/ScreenNav/Groups/SupGroups";
import Icon2 from "react-native-vector-icons/Entypo";
import { PromotionForm } from "./app/screens/Promotion/PromotionForm";
import { Promotion } from "./app/screens/Promotion/Promotion";

//Retorno de pedido
import { PedidoContext } from "./app/context/PedidosContext";
//Firebase
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadConfiguration } from "./app/utils/FirebaseConfig";
//Importaciones de fuente
import { FontsLoader } from "./app/Components/FontsLoader";
import { Reedem } from "./app/screens/ScreenNav/Redeem";
import { SessionContext } from "./app/context/SessionContext";
import { BadgeIcon } from "./app/Components/GeneralComponents/badge";
import { Predictions } from "./app/screens/Predictions/Predictions";
import { NewPredictionOptions } from "./app/screens/Predictions/PredictionOptions";
import { PredictionVSForm } from "./app/screens/Predictions/PredictionVSForm";
import { PredictionListForm } from "./app/screens/Predictions/PredictionListForm";
import { PredictionList } from "./app/screens/Predictions/PredictionList";
import { PredictionVS } from "./app/screens/Predictions/PredictionVS";
import { PredictionVSEdit } from "./app/screens/Predictions/PredictionVSEdit";
import { Trivia } from "./app/screens/Trivia/Trivia";
import { TriviaDetails } from "./app/screens/Trivia/TriviaDetails";
import { NotificationsForm } from "./app/screens/Notificaciones/NotificationsForm";
import { NewTrivia } from "./app/screens/Trivia/NewTrivia";
import { Products } from "./app/screens/Products/Products";
import { LoginForm } from "./app/screens/LoginScreen/LoginScreen";

const LoginStack = createNativeStackNavigator();
// const GroupStack = createNativeStackNavigator();
const TabBar = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const PromotionStack = createNativeStackNavigator();
const PredictionStack = createNativeStackNavigator();
const TriviasStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();

const TriviasNav = () => {
  return (
    <TriviasStack.Navigator>
      <TriviasStack.Screen
        name="Principal"
        component={Trivia}
        options={{ headerShown: false }}
      />
      <TriviasStack.Screen
        name="triviaDetails"
        component={TriviaDetails}
        options={{ headerShown: false }}
      />
      <TriviasStack.Screen
        name="new-trivia"
        component={NewTrivia}
        options={{ headerShown: false }}
      />
    </TriviasStack.Navigator>
  );
};

const NotificationsNav = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="Principal"
        component={NotificationsForm}
        options={{ headerShown: false }}
      />
    </NotificationsStack.Navigator>
  );
};

const PredictionNav = () => {
  return (
    <PredictionStack.Navigator>
      <PredictionStack.Screen
        name="Principal"
        component={Predictions}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="Selection"
        component={NewPredictionOptions}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="PredictionVS"
        component={PredictionVS}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="PredictionList"
        component={PredictionList}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="PredictionVSForm"
        component={PredictionVSForm}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="PredictionListForm"
        component={PredictionListForm}
        options={{ headerShown: false }}
      />
      <PredictionStack.Screen
        name="PredictionVSEdit"
        component={PredictionVSEdit}
        options={{ headerShown: false }}
      />
    </PredictionStack.Navigator>
  );
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Esta opción oculta el encabezado del drawer
      }}
    >
      <Drawer.Screen
        name="Feed"
        component={BarNavigator}
        options={{ drawerLabel: "Tab Screens" }}
      />
    </Drawer.Navigator>
  );
};

const BarNavigator = () => {
  return (
    <TabBar.Navigator
      initialRouteName="Codigos"
      screenOptions={() => ({
        tabBarActiveTintColor: theme.colors.orangeSegunda,
        tabBarInactiveTintColor: theme.colors.greySegunda,
        tabBarStyle: {
          backgroundColor: theme.colors.blackSegunda,
          height: 60,
          // borderTopEndRadius: 10,
          // borderTopStartRadius: 10,
          paddingBottom: 5,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      {/* <TabBar.Screen
        name="Menu"
        component={GroupsNavigator}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.butMenu}
              onPress={() => navigation.toggleDrawer()}
            >
              <View>
                <Icon
                  name="menu"
                  size={24}
                  color={theme.colors.whiteSegunda}
                  type="Entypo"
                />
                <Text
                  style={{
                    color: theme.colors.whiteSegunda,
                    fontSize: 10,
                    paddingTop: 8.5,
                  }}
                >
                  Menu
                </Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      /> */}
      <TabBar.Screen
        name="Promociones"
        component={Promotion}
        options={{
          headerShown: false,
          title: "Promociones",
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="shoppingcart"
                size={24}
                color={color}
                type="ant-design"
              />
            );
          },
        }}
      />
      {/* <TabBar.Screen
        name="Predicciones"
        component={PredictionNav}
        options={{
          headerShown: false,
          title: "Predicciones",
          tabBarIcon: ({ color }) => {
            return (
              <Icon name="dotchart" size={24} color={color} type="ant-design" />
            );
          },
        }}
      /> */}
      <TabBar.Screen
        name="Trivias"
        component={TriviasNav}
        options={{
          headerShown: false,
          title: "Trivias",
          tabBarIcon: ({ color }) => {
            return (
              <Icon name="dotchart" size={24} color={color} type="ant-design" />
            );
          },
        }}
      />
      <TabBar.Screen
        name="Codigos"
        component={RedeemCode}
        options={{
          headerShown: false,
          title: "Códigos",
          tabBarIcon: ({ color }) => {
            return (
              <Icon2 name="ticket" size={24} color={color} type="Entypo" />
            );
          },
        }}
      />
      <TabBar.Screen
        name="Comentarios"
        component={Coments}
        options={{
          headerShown: false,
          title: "Comentarios",
          tabBarIcon: ({ color }) => {
            return (
              <Icon name="message1" size={21} color={color} type="ant-design" />
            );
          },
        }}
      />

      <TabBar.Screen
        name="Canje"
        component={Reedem}
        options={{
          headerShown: false,
          title: "Canjes",
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="redeem"
                size={24}
                color={color}
                type="MaterialIcons"
              />
              // <BadgeIcon
              //   iconName="redeem"
              //   iconSize={24}
              //   iconColor={color}
              //   iconType="MaterialIcons"
              //   badgeStatus="error"
              // />
            );
          },
        }}
      />
      <TabBar.Screen
        name="Notifications"
        component={NotificationsNav}
        options={{
          headerShown: false,
          title: "Notificaciones",
          tabBarIcon: ({ color }) => {
            return (
              <Icon name="bell" size={24} color={color} type="entypo" />
              // <BadgeIcon
              //   iconName="redeem"
              //   iconSize={24}
              //   iconColor={color}
              //   iconType="MaterialIcons"
              //   badgeStatus="error"
              // />
            );
          },
        }}
      />
      <TabBar.Screen
        name="Productos"
        component={Products}
        options={{
          headerShown: false,
          title: "Productos",
          tabBarIcon: ({ color }) => {
            return (
              <Icon name="bowl" size={24} color={color} type="entypo" />
              // <BadgeIcon
              //   iconName="redeem"
              //   iconSize={24}
              //   iconColor={color}
              //   iconType="MaterialIcons"
              //   badgeStatus="error"
              // />
            );
          },
        }}
      />
    </TabBar.Navigator>
  );
};

// const GroupsNavigator = () => {
//   return (
//     <GroupStack.Navigator>
//       <GroupStack.Screen
//         name="ListGroups"
//         component={ListGroups}
//         options={{
//           title: "List_Groups",
//           headerShown: false,
//         }}
//       />
//       <GroupStack.Screen
//         name="Groups"
//         component={Groups}
//         options={{
//           title: "GroupsMembers",
//           headerShown: false,
//         }}
//       />
//       <GroupStack.Screen
//         name="SupGroups"
//         component={SupGroups}
//         options={{
//           title: "Sup_Groups",
//           headerShown: false,
//         }}
//       />
//     </GroupStack.Navigator>
//   );
// };

const LoginNav = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginNav"
        options={{
          headerShown: false,
        }}
        component={LoginForm}
      />
    </LoginStack.Navigator>
  );
};

export default function App() {
  const [login, setLogin] = useState(false);
  const { changeUser } = useContext(SessionContext);

  const verficarFire = async (fnSetLogin, id) => {
    try {
      const docRef = doc(global.dbCon, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        fnSetLogin(true);
        changeUser(docSnap.data());
        // console.log("Usuario encontrado:::::::::::::::::::::>:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
      }
    } catch (error) {}
  };

  const registarObserver = () => {
    const auth = getAuth();
    if (!global.DesSuscribirObserver) {
      global.DesSuscribirObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          const uid = user.uid;
          // console.log("Observer Cambia SING IN");
          verficarFire(setLogin, uid);
          // setLogin(true);

          // console.log("L,", login);
          // ...
        } else {
          // User is signed out
          // ...
          // console.log("Observer Cambia SING OUT");
          setLogin(false);
        }
      });
    }
  };

  loadConfiguration();
  registarObserver();

  return (
    // <PedidoContext.Provider value={{ user, setUser }}>
    <FontsLoader>
      <NavigationContainer>
        <StatusBar
          style={{
            flex: 1,
            backgroundColor: "#62CBDE",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        {login ? <MyDrawer /> : <MyDrawer />}
        {/* {login ? <MyDrawer /> : <LoginNav />} */}
      </NavigationContainer>
    </FontsLoader>
    // </PedidoContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteSegunda,
    alignItems: "center",
    justifyContent: "center",
    dColor: "gray",
  },
  texto: {
    fontFamily: "Lato_400Regular_Italic",
  },
  butMenu: {
    paddingHorizontal: theme.separation.horizontalSeparation,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5.5,
  },
});
