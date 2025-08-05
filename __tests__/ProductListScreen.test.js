import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ProductListScreen from '../screens/ProductListScreen';
import axios from 'axios';

jest.mock('axios');
jest.useFakeTimers();

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
};

const mockProducts = [
  { id: 1, title: "Product 1", price: 10, thumbnail: "https://via.placeholder.com/150" },
  { id: 2, title: "Product 2", price: 20, thumbnail: "https://via.placeholder.com/150" },
];

describe("ProductListScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();

    });

    it('shows loading indicator while fetching products', async () => {
        axios.get.mockImplementation(() => new Promise(() => {})); // Simulate loading state
        const { getByTestId } = render(<ProductListScreen navigation={mockNavigation} />);
        
        await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeTruthy();
        });
    });

    it('shows error message on fetch failure', async () => {
        axios.get.mockRejectedValue(new Error("Network Error"));
        const { getByTestId } = render(<ProductListScreen navigation={mockNavigation} />);
        await waitFor(() => {
            expect(getByTestId('error-message')).toBeTruthy();
        });
    });

    it('renders product list after fetching', async () => {
        axios.get.mockResolvedValue({ data: { products: mockProducts } });
        const { getByText } = render(<ProductListScreen navigation={mockNavigation} />);
        await waitFor(() => {
            expect(getByText("Product 1")).toBeTruthy();
            expect(getByText("$10")).toBeTruthy();
            expect(getByText("Product 2")).toBeTruthy();
        });
    });

    it('renders products in a two-column layout', async () => {
        axios.get.mockResolvedValue({ data: { products: mockProducts }});
        const { getAllByTestId } = render(<ProductListScreen navigation={mockNavigation} />);

        await waitFor(() => {
            const items = getAllByTestId('product-item');
            expect(items.length).toBe(mockProducts.length); 
            
            // Check for two-column layout
            items.forEach(item => {
                expect(item.props.style).toEqual(
                    expect.objectContaining({ margin: expect.any(Number) })
                );
            });
        }, { timeout: 5000 });
    });

    it('navigates to ProductDetailScreen on item press', async () => {
        axios.get.mockResolvedValue({ data: { products: mockProducts } });
        const { getByText } = render(<ProductListScreen navigation={mockNavigation} />);
        await waitFor(() => {
            const productItem = getByText("Product 1");
            fireEvent.press(productItem);
            expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { productId: 1 });
        });
    });
});