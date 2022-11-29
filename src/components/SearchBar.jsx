import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
function SearchBar() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');

	const formSubmitHandler = (e) => {
		e.preventDefault();
		navigate(`/search/${searchTerm}`);
		setSearchTerm('');
	};

	return (
		<form
			onSubmit={formSubmitHandler}
			autoComplete='off'
			className='p-2 text-gray-400 focus-within:text-gray-600'
		>
			<label htmlFor='search-field' className='sr-only'>
				Search all songs
			</label>
			<div className='flex flex-row justify-start items-center '>
				<FiSearch className='w-5 h-5 ml-4' />
				<input
					type='search'
					name='search-field'
					autoComplete='off'
					placeholder='Search'
					id='search-field'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='flex-1 bg-transparent outline-none border-none text-base text-white placeholder-gray-500 p-4'
				/>
			</div>
		</form>
	);
}

export default SearchBar;
