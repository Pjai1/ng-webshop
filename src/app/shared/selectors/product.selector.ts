import { ProductConnection } from 'src/graphql-types';

export interface IProduct {
  id?: number;
  sku?: string;
  title?: string;
  price?: number;
  basePrice?: number;
  stocked?: boolean;
  image?: string;
  desc?: string;
  discount?: number;
}

export function CreateProducts(data: ProductConnection) {
  console.log(data);
  const newProducts: IProduct[] = [];
  data.edges.forEach((edge) => {
    const newProduct: IProduct = {
      id: edge.node.id,
      sku: edge.node.sku,
      title: edge.node.title,
      price: edge.node.price,
      basePrice: edge.node.basePrice,
      stocked: edge.node.stocked,
      image: edge.node.image,
      desc: edge.node.desc,
      discount: 1 - this.price / this.basePrice,
    };

    newProducts.push(newProduct);
  });
  return newProducts;
}
