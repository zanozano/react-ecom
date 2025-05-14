import React, { useEffect, useState } from 'react';

interface Product {
	category: string;
}

interface FetchResponse {
	products: Product[];
}

const Sidebar: React.FC = () => {
	const [products, setProducts] = useState<string[]>([]);

	// const [keywords] = useState<string[]>([
	//   "Apple",
	//   "Banana",
	//   "Cherry",
	//   "Date",
	//   "Elderberry",
	//   "Fig",
	// ]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products');
				const data: FetchResponse = await response.json();
				const uniqueCategory = Array.from(
					new Set(data.products.map((product) => product.category))
				);
				console.log(uniqueCategory);
				setProducts(uniqueCategory);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className='w-64 p-5 h-screen bg-amber-50'>
			<h2 className='mb-4'>Product Categories</h2>
			<section className='flex flex-col gap-4'>
				<input
					type='text'
					className='border-2 rounded px-2 sm:mb-0 w-full'
					placeholder='Search Products'
				/>

				<div className='flex gap-2'>
					<input
						type='text'
						className='border-2 rounded px-2 sm:mb-0 w-full'
						placeholder='Min'
					/>
					<input
						type='text'
						className='border-2 rounded px-2 sm:mb-0 w-full'
						placeholder='Max'
					/>
				</div>
			</section>
		</div>
	);
};

export default Sidebar;
