import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Image, View, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const images = [
  {index: 0, source: require('../assets/images/0.jpeg'),},
  {index: 1, source: require('../assets/images/1.jpeg'),},
  {index: 2, source: require('../assets/images/2.jpeg'),},
  {index: 3, source: require('../assets/images/3.jpeg'),},
  {index: 4, source: require('../assets/images/4.jpeg'),},
  {index: 5, source: require('../assets/images/5.jpeg'),},
  {index: 6, source: require('../assets/images/6.jpeg'),},
  {index: 7, source: require('../assets/images/7.jpeg'),},
  {index: 8, source: require('../assets/images/8.jpeg'),},
  {index: 9, source: require('../assets/images/9.jpeg'),},
  {index: 10, source: require('../assets/images/10.jpeg'),},
  {index: 11, source: require('../assets/images/11.jpeg'),},
  {index: 12, source: require('../assets/images/12.jpeg'),},
  {index: 13, source: require('../assets/images/13.jpeg'),},
  {index: 14, source: require('../assets/images/14.jpeg'),},
  {index: 15, source: require('../assets/images/15.jpeg'),},
  {index: 16, source: require('../assets/images/16.jpeg'),},
  {index: 17, source: require('../assets/images/17.jpeg'),},
  {index: 18, source: require('../assets/images/18.jpeg'),},
  {index: 19, source: require('../assets/images/19.jpeg'),}
];


const HomeScreen = ({ navigation }) => {
  const imageComponents = images.map((image, index) => (
    <TouchableOpacity
      key={`image_${index}`}
      onPress={() => navigation.navigate('Detail')}
    >
      <Image
        source={image.source}
        style={[styles.image, index % 2 === 0 ? { marginRight: 10 } : null]}
      />
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageRow}>{imageComponents}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageRow: {
    flexDirection: 'row', // Resimleri yatay olarak sıralar
    flexWrap: 'wrap', // Resimleri bir satıra sığdığında alt satıra geçer
    justifyContent: 'space-evenly', // Resimleri sola yaslar
  },
  image: {
    width: windowWidth * 0.4,
    height: 200,
    marginBottom: 10,
  },
});