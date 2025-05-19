import React, { useContext, useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
	category: string;
}

interface FetchResponse {
	products: Product[];
}

const Sidebar: React.FC = () => {
	const { searchQuery, setSearchQuery, minPrice, setMinPrice, maxPrice, setMaxPrice } =
		useFilter();
	const [categories, setCategories] = useState<string[]>([]);

	const [keywords] = useState<string[]>([
		'Apple',
		'Banana',
		'Cherry',
		'Date',
		'Elderberry',
		'Fig',
	]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products');
				const data: FetchResponse = await response.json();
				const uniqueCategory = Array.from(
					new Set(data.products.map((product) => product.category))
				);
				setCategories(uniqueCategory);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setMinPrice(value ? parseFloat(value) : undefined);
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setMaxPrice(value ? parseFloat(value) : undefined);
	};

	return (
		<div className='w-64 p-5 h-screen bg-amber-50'>
			<h2 className='mb-4'>Product Categories</h2>
			<section className='flex flex-col gap-4'>
				<input
					type='text'
					className='border-2 rounded px-2 sm:mb-0 w-full'
					placeholder='Search Products'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				<div className='flex gap-2'>
					<input
						type='text'
						className='border-2 rounded px-2 sm:mb-0 w-full'
						placeholder='Min'
						value={minPrice ?? ''}
						onChange={handleMinPriceChange}
					/>
					<input
						type='text'
						className='border-2 rounded px-2 sm:mb-0 w-full'
						placeholder='Max'
						value={maxPrice ?? ''}
						onChange={handleMaxPriceChange}
					/>
				</div>

				<div>
					<h2>Categories</h2>
					{categories.map((category, index) => (
						<label key={index} className='block mb-2 cursor-pointer'>
							<input type='radio' name='category' value={category} />
							{category.toUpperCase()}
						</label>
					))}
				</div>

				<section>
					<div>
						<h2>Keywords</h2>
					</div>
					{keywords.map((keyword, index) => (
						<button
							key={index}
							className='flex w-full hover:bg-amber-100 mb-2 cursor-pointer p-2 rounded'>
							{keyword}
						</button>
					))}
				</section>

				<button className='bg-amber-200 hover:bg-amber-300 p-2 rounded'>
					Reset Filter
				</button>
			</section>
		</div>
	);
};

export default Sidebar;
