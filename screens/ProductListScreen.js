import React, { useEffect, useState } from 'react';
import { Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

  if (loading) {
    return (
      <ActivityIndicator 
          testID='loading-indicator' 
          size="large" color="#0000ff"
          style={styles.centered} 
      />
    );
  }

  if (error) {
    return (
      <Text testID='error-message' style={styles.centered}>{error}</Text>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} testID='product-item'>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      numColumns={2}
      testID='product-list'
    />
  );
}

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        margin: 5,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 6,
        resizeMode: 'cover',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
    price: {
        color: '#888',
        marginTop: 4,
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
