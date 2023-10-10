import Banner1 from '../../assets/banner.png'
import Banner2 from '../../assets/banner1.jpg'

import { View, FlatList, Image, Dimensions } from 'react-native';

export const Banner =() =>{
    let screen = Dimensions.get('window');
    let width = screen.width;

    let bannerWith = width * 0.88;

    const images = [
        { id: 1, source: Banner1 },
        { id: 2, source: Banner2 },
      ];

      const renderItem = ({ item }) => (
        <Image
          source={item.source}
          style={{ width: bannerWith, height: 150, marginRight: 5,borderRadius: 15}}
          resizeMode="cover"
        />
      );

      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          
        </View>
      );
}