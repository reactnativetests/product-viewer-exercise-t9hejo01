Create multi-screen React Native app, that fetches and displays product data from a remote API.

1. Project Setup & Navigation

· Create two screen components called ProductListScreen and ProductDetailScreen.
· Set up React Navigation to allow navigation from ProductListScreen to ProductDetailScreen.

2. Product List Screen 

· Data Fetching:

o When ProductListScreen mounts, make an HTTP GET request to https://dummyjson.com/products.

o Use fetch or axios to make the request.

o Handle potential errors during the fetch operation (Display an error message).

o Display a loading indicator (ActivityIndicator) while the data is being fetched.

· Displaying Products:

o Once the data is successfully fetched, store the array of products in the component's state.

o Display the products in a scrollable FlatList.

o Display the products in a list with two columns similar to illustrative image below

<img width="237" height="435" alt="image" src="https://github.com/user-attachments/assets/3c5283e9-f1ee-4fda-b287-26e49dbad136" />



o For each product, display its title, price and thumbnail image.

o Add a TouchableOpacity around each product item to make it tappable.

· Navigation to Details:

o When a product item is pressed, navigate to the ProductDetailScreen.

o Pass the entire product id as a navigation parameter to the ProductDetailScreen.

3. Product Detail Screen 

· Displaying Product Details:

o Retrieve the product data from the API based on the passed id parameter

o Display the following details for the selected product:

  -  title

  -  description

  -  price

  -  brand

  -  category

o Display the product's image image.

o Allow navigation back to ProductListScreen

· Styling:

o Apply basic styling to make the product details well-organized and readable.

4. UI & Usability

· Use clear headings and labels.

· Ensure the FlatList items are well-spaced and easy to read.

· Implement basic error handling (Display a "Failed to load products" message if the API call fails).

· Implement a loading state ("Loading products...") while data is being fetched.

TestIDs:

Add testIDs for testing:

  - ProductListScreen

    -   loading-indicator
    -   error-message
    -   product-item
    -   product-list

Requirements 

· Two screens: ProductListScreen and ProductDetailScreen.

· ProductListScreen fetches product data from https://dummyjson.com/products on mount.

· ProductListScreen displays a list of products (title, price) using FlatList.

· Loading indicator displayed while fetching data.

· Error handling for API requests.

· Tapping a product in ProductListScreen navigates to ProductDetailScreen.

· ProductDetailScreen displays comprehensive details (title, description, price, brand, category, thumbnail) of the selected product.

· Data is passed correctly between screens using navigation parameters
