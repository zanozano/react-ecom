import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
	category: string;
}

interface FetchResponse {
	products: Product[];
}

const Sidebar: React.FC = () => {
	const {
		searchQuery,
		setSearchQuery,
		minPrice,
		setMinPrice,
		maxPrice,
		setMaxPrice,
		setSelectedCategory,
		selectedCategory,
		setKeyword,
	} = useFilter();
	const [categories, setCategories] = useState<string[]>([]);

	const [keywords] = useState<string[]>(['Watch', 'Fashion', 'Trend', 'Shoes', 'Shirt']);

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

	const handleRadioChangeCategory = (category: string) => {
		setSelectedCategory(category);
	};

	const handleKeywordChange = (keyword: string) => {
		setKeyword(keyword);
	};

	const handleResetFilters = () => {
		setSearchQuery('');
		setSelectedCategory('');
		setMinPrice(undefined);
		setMaxPrice(undefined);
		setKeyword('');
	};

	return (
		<div className='w-[320px] h-auto p-6 bg-blue-50 flex flex-col'>
			<h2 className='text-xl font-semibold mb-6 border-b border-blue-300 pb-2 text-blue-900'>
				Filters
			</h2>

			<section className='mb-6'>
				<label htmlFor='search' className='block text-sm font-medium mb-1 text-blue-800'>
					Search Products
				</label>
				<input
					id='search'
					type='text'
					className='w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition'
					placeholder='Search Products'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</section>

			<section className='mb-6 w-full'>
				<label className='block text-sm font-medium mb-2 text-blue-800'>Price Range</label>
				<div className='flex gap-3 w-full'>
					<input
						type='number'
						className='flex w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition'
						placeholder='Min'
						value={minPrice ?? ''}
						onChange={handleMinPriceChange}
						min={0}
					/>
					<input
						type='number'
						className='flex w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition'
						placeholder='Max'
						value={maxPrice ?? ''}
						onChange={handleMaxPriceChange}
						min={0}
					/>
				</div>
			</section>

			<section className='mb-6'>
				<h3 className='text-sm font-medium mb-3 text-blue-800'>Categories</h3>
				<div className='flex flex-col space-y-2 overflow-y-auto pr-2'>
					<button
						onClick={() => handleRadioChangeCategory('')}
						className={`text-left px-3 py-1 rounded-md border cursor-pointer transition
        ${
			selectedCategory === ''
				? 'bg-blue-400 text-white border-blue-400 shadow'
				: 'border-transparent hover:bg-blue-100 hover:border-blue-300'
		}`}
						aria-pressed={selectedCategory === ''}
						role='radio'
						aria-checked={selectedCategory === ''}>
						All Categories
					</button>

					{categories.map((category, index) => (
						<button
							key={index}
							onClick={() => handleRadioChangeCategory(category)}
							className={`text-left px-3 py-1 rounded-md border cursor-pointer transition
          ${
				selectedCategory === category
					? 'bg-blue-400 text-white border-blue-400 shadow'
					: 'border-transparent hover:bg-blue-100 hover:border-blue-300'
			}`}
							aria-pressed={selectedCategory === category}
							role='radio'
							aria-checked={selectedCategory === category}>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</button>
					))}
				</div>
			</section>

			<section className='mb-6'>
				<h3 className='text-sm font-medium mb-3 text-blue-800'>Keywords</h3>
				<div className='flex flex-wrap gap-2'>
					{keywords.map((keyword, index) => (
						<button
							key={index}
							onClick={() => handleKeywordChange(keyword)}
							className='cursor-pointer bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm hover:bg-blue-300 transition focus:outline-none focus:ring-2 focus:ring-blue-400'>
							{keyword}
						</button>
					))}
					<button
						onClick={() => handleKeywordChange('')}
						className='cursor-pointer bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition'>
						Clear Keywords
					</button>
				</div>
			</section>

			<button
				onClick={handleResetFilters}
				className='bg-blue-400 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500'>
				Reset Filters
			</button>
		</div>
	);
};

export default Sidebar;
