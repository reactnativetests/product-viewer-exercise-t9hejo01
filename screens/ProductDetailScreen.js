import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ProductDetailScreen({ route, navigation }) {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${productId}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load product details:', error);
                setLoading(false);
                setError('Failed to load product details');
            });
    }, [productId]);

    if (loading) {
        return (
            <ActivityIndicator 
                testID='loading-indicator' 
                size="large" color="#0000ff"
                style={styles.centered} 
            />
        );
    }

    if (!product) {
        return (
            <Text testID='error-message' style={styles.centered}>Product not found</Text>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.brand}>Brand: {product.brand}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Button title="Back to Products" onPress={() => navigation.goBack()} testID='back-button' />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    padding: 20,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginVertical: 12,
    textAlign: 'justify',
  },
});

