import LOCAL_IP from '@/config';
import axios from 'axios';

export const validateOrder = async (): Promise<boolean> => {
    try {
        const { data: orders } = await axios.get(`${LOCAL_IP}/orders`);
        const hasPendingOrders = orders.some((order: { status: string }) => order.status === "Pendente");

        if (hasPendingOrders) {
            console.warn("Não é possível adicionar um novo pedido: já existe um pedido pendente.");
            return false;
        }

        return true;
    } catch (error) {
        console.error('Erro ao validar pedido:', error);
        return false;
    }
};