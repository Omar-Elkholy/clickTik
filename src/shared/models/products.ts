export interface productRes {
    limit: number;
    skip: string,
    total: number,
    products: product[];
}

export interface product {
    brand: string,
    category: string,
    description: string,
    discountPercentage: string,
    id: number,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string
}