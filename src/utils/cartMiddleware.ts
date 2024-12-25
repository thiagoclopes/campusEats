import axios from 'axios';
import LOCAL_IP from '@/config';

interface ValidationResult {
    isValid: boolean;
    errorType?: 'orders' | 'cart' | null;
}

export const validateCart = async (newProductRestaurantId: string): Promise<ValidationResult> => {
    try {
        const { data: currentCart } = await axios.get(`${LOCAL_IP}/cart`);

        if (currentCart.length > 0) {
            const firstRestaurantId = currentCart[0].restaurantId;

            if (newProductRestaurantId !== firstRestaurantId) {
                console.warn("O produto pertence a um restaurante diferente.");
                return { isValid: false, errorType: 'cart' };
            }
        }

        const { data: orders } = await axios.get(`${LOCAL_IP}/orders`);
        const hasPendingOrders = orders.some((order: { status: string }) => order.status === "Pendente");

        if (hasPendingOrders) {
            return { isValid: false, errorType: 'orders' };
        }

        return { isValid: true };
    } catch (error) {
        console.error('Erro ao validar o carrinho ou pedido:', error);
        return { isValid: false };
    }
};
