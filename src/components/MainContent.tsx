import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Star, Tally3, AlertCircle } from 'lucide-react';
import axios from 'axios';

const MainContent = () => {
	const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();
	const [products, setProducts] = useState<any[]>([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [filter, setFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const itemsPerpage = 25;

	useEffect(() => {
		let url = `https://dummyjson.com/products?limit=${itemsPerpage}&skip=${
			(currentPage - 1) * itemsPerpage
		}`;

		if (keyword) {
			url = `https://dummyjson.com/products/search?q=${keyword}&limit=${itemsPerpage}&skip=${
				(currentPage - 1) * itemsPerpage
			}`;
		}

		const fetchProducts = async () => {
			try {
				const response = await axios.get(url);
				setProducts(response.data.products);
				setTotalProducts(response.data.total || 0);
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

		if (minPrice !== undefined) {
			filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
		}

		if (maxPrice !== undefined) {
			filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
		}

		if (searchQuery) {
			filteredProducts = filteredProducts.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		switch (filter) {
			case 'cheap':
				filteredProducts.sort((a, b) => a.price - b.price);
				break;
			case 'expensive':
				filteredProducts.sort((a, b) => b.price - a.price);
				break;
			case 'popular':
				filteredProducts.sort((a, b) => b.rating - a.rating);
				break;
			default:
				break;
		}

		return filteredProducts;
	};

	const filteredProducts = getFilteredProducts();
	const totalPages = Math.ceil(totalProducts / itemsPerpage);

	const paginationRange = () => {
		const delta = 2;
		const range = [];
		const left = Math.max(2, currentPage - delta);
		const right = Math.min(totalPages - 1, currentPage + delta);

		range.push(1);
		if (left > 2) range.push('...');
		for (let i = left; i <= right; i++) range.push(i);
		if (right < totalPages - 1) range.push('...');
		if (totalPages > 1) range.push(totalPages);

		return range;
	};

	return (
		<section className='w-full flex flex-col p-5'>
			<div className='flex flex-col w-full'>
				<div className='relative inline-block text-left'>
					<button
						onClick={() => setDropdownOpen((open) => !open)}
						className='inline-flex justify-center items-center border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
						aria-haspopup='true'
						aria-expanded={dropdownOpen}>
						<Tally3 className='mr-2' />
						{filter === 'all'
							? 'Filter'
							: filter.charAt(0).toUpperCase() + filter.slice(1)}
						<svg
							className={`ml-2 h-5 w-5 transition-transform duration-200 ${
								dropdownOpen ? 'rotate-180' : 'rotate-0'
							}`}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							aria-hidden='true'>
							<path
								fillRule='evenodd'
								d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z'
								clipRule='evenodd'
							/>
						</svg>
					</button>

					{dropdownOpen && (
						<div className='absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
							<div className='py-1'>
								<button
									onClick={() => {
										setFilter('cheap');
										setDropdownOpen(false);
									}}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'>
									Cheap
								</button>
								<button
									onClick={() => {
										setFilter('expensive');
										setDropdownOpen(false);
									}}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'>
									Expensive
								</button>
								<button
									onClick={() => {
										setFilter('popular');
										setDropdownOpen(false);
									}}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'>
									Popular
								</button>
								<button
									onClick={() => {
										setFilter('all');
										setDropdownOpen(false);
									}}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'>
									All
								</button>
							</div>
						</div>
					)}
				</div>

				<div className='grid grid-cols-4 gap-4 mt-6'>
					{filteredProducts.length === 0 ? (
						<div className='col-span-4 flex flex-col items-center justify-center text-gray-500 mt-10'>
							<AlertCircle className='w-12 h-12 mb-3' />
							<p>No products found.</p>
						</div>
					) : (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className='rounded-md shadow cursor-pointer hover:shadow-lg transition'>
								<div className='bg-gray-100 rounded mb-2 p-1'>
									<img
										src={product.thumbnail}
										alt={product.title}
										className='w-full h-40 object-cover rounded'
									/>
								</div>
								<div className='p-3'>
									<h5 className='font-semibold mb-2 text-[14px]'>
										{product.title}
									</h5>
									<div className='flex justify-between items-center'>
										<p className='text-sm text-gray-600'>${product.price}</p>
										<p className='text-xs flex items-center text-yellow-500'>
											<Star className='w-4 h-4 mr-1' />
											{product.rating}
										</p>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				<div className='flex justify-center items-center space-x-2 mt-6'>
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className={`px-3 py-1 rounded-md border ${
							currentPage === 1
								? 'bg-gray-200 cursor-not-allowed'
								: 'bg-white hover:bg-gray-100'
						}`}>
						Previous
					</button>

					{paginationRange().map((page, idx) =>
						page === '...' ? (
							<span key={`dots-${idx}`} className='px-2 select-none'>
								...
							</span>
						) : (
							<button
								key={page}
								onClick={() => setCurrentPage(Number(page))}
								className={`px-3 py-1 rounded-md border ${
									currentPage === page
										? 'bg-indigo-600 text-white cursor-default'
										: 'bg-white hover:bg-gray-100'
								}`}>
								{page}
							</button>
						)
					)}

					<button
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages || totalPages === 0}
						className={`px-3 py-1 rounded-md border ${
							currentPage === totalPages || totalPages === 0
								? 'bg-gray-200 cursor-not-allowed'
								: 'bg-white hover:bg-gray-100'
						}`}>
						Next
					</button>
				</div>
			</div>
		</section>
	);
};

export default MainContent;
