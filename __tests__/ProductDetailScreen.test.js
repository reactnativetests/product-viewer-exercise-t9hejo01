import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import axios from "axios";

const mockNavigation = {
    goBack: jest.fn(),
};

const mockRoute = {
    params: {
        productId: 1,
    },
};

jest.useFakeTimers();
jest.mock("axios");

describe("ProductDetailScreen", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading indicator initially', async () => {
        axios.get.mockImplementation(() =>
            new Promise(() => {})
        );
        const { getByTestId } = render(
            <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
        );

            await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeTruthy();
        });
    });

    it('shows error message if fetch fails', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        const { getByTestId } = render(
            <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
        );

        await waitFor(() => {
            expect(getByTestId('error-message')).toBeTruthy();
            expect(getByTestId('error-message').props.children).toBe('Product not found');
        });
    });

    it('renders product details correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                title: 'Test Product',
                description: "A great product",
                price: 99,
                brand: "CoolBrand",
                category: "Technology",
                thumbnail: 'https://example.com/image.jpg'
            }
        });

        const { getByText } = render(
            <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
        );

        await waitFor(() => {
            expect(getByText('Test Product')).toBeTruthy();
            expect(getByText('$99')).toBeTruthy();
            expect(getByText('Brand: CoolBrand')).toBeTruthy();
            expect(getByText('Category: Technology')).toBeTruthy();
            expect(getByText('A great product')).toBeTruthy();
        });
    });

    it('navigates back to products on button press', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                title: 'Test Product',
                description: "A great product",
                price: 99,
                brand: "CoolBrand",
                category: "Technology",
                thumbnail: 'https://example.com/image.jpg'
            }
        });

        const { getByTestId } = render(
            <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />
        );

        await waitFor(() => {
            fireEvent.press(getByTestId('back-button'));
            expect(mockNavigation.goBack).toHaveBeenCalled();
        });
        
    });
});
