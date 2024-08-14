import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductForm from '../components/ProductForm';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ProductForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
