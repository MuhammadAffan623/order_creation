import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProduct = async (product) => {
  try {
    const products = await AsyncStorage.getItem('products');
    const parsedProducts = products ? JSON.parse(products) : [];
    parsedProducts.push(product);
    await AsyncStorage.setItem('products', JSON.stringify(parsedProducts));
  } catch (error) {
    console.error('Failed to save product:', error);
  }
};

export const getProducts = async () => {
  try {
    const products = await AsyncStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
};

export const deleteProduct = async (id) => {
  try {
    const products = await AsyncStorage.getItem('products');
    const parsedProducts = products ? JSON.parse(products) : [];
    const updatedProducts = parsedProducts.filter((product) => product.id !== id);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};
