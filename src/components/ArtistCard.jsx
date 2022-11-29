import React from 'react';
import { useNavigate } from 'react-router-dom';

function ArtistCard({ track }) {
	const navigate = useNavigate();

	return (
		<div
			className='flex flex-col w-[240px] p-4 bg-stone-400 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'
			onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}
		>
			<img
				src={track?.images?.coverart}
				alt='artist'
				className='w-full h-56 rounded-lg'
			/>
			<p className='mt-4 font-semibold text-lg text-white truncate'>
				{track?.subtitle}
			</p>
		</div>
	);
}

export default ArtistCard;
