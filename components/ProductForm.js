import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { saveProduct } from "../utils/storage";
import uuid from "react-native-uuid";

export default function ProductForm({ navigation }) {
  const [name, setName] = useState("");
  const [boxLength, setBoxLength] = useState("");
  const [noOfTiles, setNoOfTiles] = useState("");

  const handleSave = async () => {
    console.log("handleSave");
    console.log("uuidv4() >>", uuid.v4());
    const product = {
      id: uuid.v4(), // Dynamic product ID
      name,
      boxLength: parseFloat(boxLength),
      noOfTiles: parseInt(noOfTiles),
    };
    console.log("bb ", product);
    await saveProduct(product);
    setName("");
    setBoxLength("");
    setNoOfTiles("");
    navigation.navigate("Product");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Box Length in Meters"
        value={boxLength}
        onChangeText={setBoxLength}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Tiles in Box"
        value={noOfTiles}
        onChangeText={setNoOfTiles}
        keyboardType="numeric"
      />
      <Button title="Save Product" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
