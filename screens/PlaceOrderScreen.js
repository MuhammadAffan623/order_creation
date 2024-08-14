import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { getProducts } from "../utils/storage";
import { Picker } from "@react-native-picker/picker";

export default function PlaceOrderScreen() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [numOfBoxes, setNumOfBoxes] = useState("");
  const [totalLengthMeters, setTotalLengthMeters] = useState("");
  const [numOfTiles, setNumOfTiles] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleOrder = () => {
    if (selectedProduct && (numOfBoxes || totalLengthMeters || numOfTiles)) {
      const selectedProductDetails = products.find(
        (product) => product.id === selectedProduct
      );

      let totalTiles, totalMeters, totalBoxes;

      if (numOfBoxes) {
        // Calculate based on the number of boxes
        totalTiles = parseFloat(numOfBoxes) * selectedProductDetails.noOfTiles;
        totalMeters = parseFloat(numOfBoxes) * selectedProductDetails.boxLength;
        totalBoxes = parseFloat(numOfBoxes);
      } else if (totalLengthMeters) {
        // Calculate based on the total length in meters
        const tileLength =
          selectedProductDetails.boxLength / selectedProductDetails.noOfTiles;
        totalTiles = parseFloat(totalLengthMeters) / tileLength;
        totalBoxes =
          parseFloat(totalLengthMeters) / selectedProductDetails.boxLength;
        totalMeters = parseFloat(totalLengthMeters);
      } else if (numOfTiles) {
        // Calculate based on the number of tiles
        const tileLength =
          selectedProductDetails.boxLength / selectedProductDetails.noOfTiles;
        totalMeters = parseFloat(numOfTiles) * tileLength;
        totalBoxes = parseFloat(numOfTiles) / selectedProductDetails.noOfTiles;
        totalTiles = parseFloat(numOfTiles);
      }

      const details = {
        productName: selectedProductDetails.name,
        totalTiles: parseFloat(totalTiles.toFixed(2)), // Keep totalTiles as float
        totalMeters: parseFloat(totalMeters.toFixed(2)), // Limit to 2 decimal places
        totalBoxes: parseFloat(totalBoxes.toFixed(2)), // Limit to 2 decimal places
        noOfTiles: selectedProductDetails.noOfTiles,
        boxLength: selectedProductDetails.boxLength,
      };

      setOrderDetails(details);
    } else {
      alert(
        "Please select a product and enter the number of tiles, total length in meters, or the number of boxes."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a product" value={null} />
        {products.map((product) => (
          <Picker.Item
            key={product.id}
            label={product.name}
            value={product.id}
          />
        ))}
      </Picker>

      {selectedProduct && (
        <>
          <Text style={styles.inputTitle}>Number of Boxes</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Number of Boxes"
            value={numOfBoxes}
            onChangeText={(value) => {
              setNumOfBoxes(value);
              setTotalLengthMeters(""); // Clear other inputs
              setNumOfTiles("");
            }}
            keyboardType="numeric"
          />
          <Text style={styles.orText}>OR</Text>

          <Text style={styles.inputTitle}>Total Length in Meters</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Total Length in Meters"
            value={totalLengthMeters}
            onChangeText={(value) => {
              setTotalLengthMeters(value);
              setNumOfBoxes(""); // Clear other inputs
              setNumOfTiles("");
            }}
            keyboardType="numeric"
          />
          <Text style={styles.orText}>OR</Text>

          <Text style={styles.inputTitle}>Number of Tiles</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Number of Tiles"
            value={numOfTiles}
            onChangeText={(value) => {
              setNumOfTiles(value);
              setNumOfBoxes(""); // Clear other inputs
              setTotalLengthMeters("");
            }}
            keyboardType="numeric"
          />
        </>
      )}

      <Button title="Place Order" onPress={handleOrder} />

      {orderDetails && (
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderHeading}>Order Details</Text>
          <Text>Product: {orderDetails.productName}</Text>
          <Text>Tiles per Box: {orderDetails.noOfTiles}</Text>
          <Text>Box Length: {orderDetails.boxLength} m</Text>
          {/* Horizontal line */}
          <View style={styles.horizontalLine} />
          {/* Right-aligned text */}
          <Text style={styles.rightAlignText}>Total Tiles: {orderDetails.totalTiles}</Text>
          <Text style={styles.rightAlignText}>Total Meters: {orderDetails.totalMeters} m</Text>
          <Text style={styles.rightAlignText}>Total Boxes: {orderDetails.totalBoxes}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  inputTitle: {
    marginBottom: 5,
    fontSize: 16,
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: "gray",
  },
  orderDetailsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  orderHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  rightAlignText: {
    textAlign: "right",
    marginBottom: 5,
  },
});
