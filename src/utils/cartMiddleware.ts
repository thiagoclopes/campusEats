import LOCAL_IP from '@/config';

export const validateCart = async (newProductRestaurantId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${LOCAL_IP}/cart`);

        const currentCart = await response.json();

        if (currentCart.length > 0) {
            const firstRestaurantId = currentCart[0].restaurantId;

            if (newProductRestaurantId !== firstRestaurantId) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Erro ao validar o carrinho:', error);
        return false;
    }
};