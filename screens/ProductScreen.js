import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { getProducts, deleteProduct } from '../utils/storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDelete(id), style: "destructive" }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>Product Name: {item.name}</Text>
      {/* <Text>Products in Box: {item.noOfProducts}</Text> */}
      <Text>Box Length: {item.boxLength} m</Text>
      <Text>Tiles in Box: {item.noOfTiles}</Text>
      <Button title="Delete" color="red" onPress={() => confirmDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add New Product"
        onPress={() => navigation.navigate('Home')}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productList: {
    marginTop: 20,
  },
  productItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
});
