import { Category } from './Category';

export interface Phone {
    id: string,
    category: Category,
    itemId: string,
    name: string,
    fullPrice: number,
    price: number,
    screen: string,
    capacity: string,
    color: string,
    ram: string,
    year: number,
    image: string,
} 
