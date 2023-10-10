import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeadbarHome } from '../PruebaComponents/headbarHome';
import { CardHome } from '../PruebaComponents/CardHome';
import { Banner } from '../PruebaComponents/Banner';
import { ButtonMore } from '../PruebaComponents/buttonMoreHome';
import { ButtonBot } from '../PruebaComponents/ButtonBot';


let screen = Dimensions.get('window');
let width = screen.width;
let height = screen.height;

//Separar la barra superior
let headSeparation = height * 0.03
let horizontalSeparation = width * 0.035



export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <HeadbarHome />
      </View>
      {/* <View style={styles.head}><HeadbarHome /></View> */}
      <View style={styles.banner}><Banner /></View>

      <View style={styles.text}>
        <Text style={styles.popular}>
          Popular!
        </Text>

        <ButtonMore />

      </View>



      <ScrollView style={styles.card} horizontal>
        <CardHome />
        <CardHome />
        <CardHome />
      </ScrollView>

      <View style={styles.text}>
        <Text style={styles.popular}>
          A Viciarse!
        </Text>

      </View>

      <View style={styles.buttonBot}>

        <ButtonBot />

      </View>










    </View>

  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginHorizontal: horizontalSeparation,
    justifyContent: 'flex-start',


  },
  head: {
    flex: 0.4,
    justifyContent: 'flex-start',
    paddingTop: headSeparation,
  },
  banner: {
    flex: 0.7,
    justifyContent: 'center',

  },
  card: {
    flex: 0.6,
    flexDirection: 'row',
    paddingBottom:15,
  },
  popular: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,


  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBot: {
    flex: 0.8,
  }



});



