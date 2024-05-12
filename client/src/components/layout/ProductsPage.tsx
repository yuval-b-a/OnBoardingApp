import { useRecoilValue } from "recoil";
import { productsState } from "../../store/products";
import { Suspense, useMemo } from "react";
import styles from './ProductsPage.module.scss';
import { VirtualizedList } from "../general/VirtualizedList";
import { useQueryParamsState } from "../../hooks/useQueryParamsState";
import { ListItem } from "../../models/ListItem";

export function ProductsPage() {  
    const [searchValue, setSearchValue] = useQueryParamsState<string>('searchText', '');;
    const products: ListItem[] = useRecoilValue(productsState);

    const filteredProducts = useMemo(() => {
        const searchValueLower = searchValue.toLowerCase();
        return searchValue ? products.filter(pr => pr.value.toLowerCase().includes(searchValueLower)) : products;
    }, [products, searchValue]);

    return (
      <div>
        <h1>Our Products</h1>
        <input 
            className={styles.input}
            placeholder="Search..."
            value={searchValue}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
             />
        <div>
            <Suspense fallback={<div>Loading...</div>}> 
                <VirtualizedList items={filteredProducts} itemHeight={25}></VirtualizedList>
            </Suspense>
        </div>
      </div>
    );
  }