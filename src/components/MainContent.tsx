import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';

const MainContent = () => {
	const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();
	const [products, setProducts] = useState<any[]>([]);
	const [filter, setFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [dropdpwnOpen, setDropdownOpen] = useState(false);
	const itemsPerpage = 10;

	useEffect(() => {
		let url = `https://dummyjson.com/products?limit=${itemsPerpage}&skip=${
			(currentPage - 1) * itemsPerpage
		}`;

		if (keyword) {
			url = `https://dummyjson.com/products/search?q=${keyword}`;
		}

		const fetchProducts = async () => {
			try {
				axios.get(url).then((response) => {
					const data = response.data;
					setProducts(data.products);
					console.log(data.products);
				});
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		fetchProducts();
	}, [currentPage, keyword]);

	const getFilteredProducts = () => {
		let filteredProducts = products;

		if (selectedCategory) {
			filteredProducts = filteredProducts.filter(
				(product) => product.category === selectedCategory
			);
		}
	};

	return (
		<section>
			<div className='flex flex-col w-full'>
				<div className='relative'>
					<button className='border px-4 py-2 rounded-full flex items-center'>
						<Tally3 className='mr-2' />

						{filter === 'all'
							? 'Filter'
							: filter.charAt(0).toLowerCase() + filter.slice(1)}
					</button>
					{dropdpwnOpen && (
						<div className='absolute top-12 left-0 bg-white border rounded shadow-lg'>
							<button className='block' onClick={() => setFilter('cheap')}>
								Cheap
							</button>
							<button className='block' onClick={() => setFilter('expensive')}>
								Expensive
							</button>
							<button className='block' onClick={() => setFilter('popular')}>
								Popular
							</button>
						</div>
					)}

					<div className='grid grid-cols-4 gap-2'></div>
				</div>
			</div>
		</section>
	);
};

export default MainContent;
