import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { Loader, SongCard, Error } from '../components';
import { useParams } from 'react-router-dom';

function Search() {
	const { searchTerm } = useParams();

	const { isPlaying, activeSong } = useSelector((state) => state.player);

	const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

	const songs = data?.tracks?.hits.map((song) => song.track);
	if (isFetching) return <Loader title='Searching..' />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl mt-4 mb-10 text-white text-left'>
				Showing results for{' '}
				<span className='font-black'>{searchTerm}</span>
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{songs?.map((song, i) => (
					<SongCard
						key={song.key}
						activeSong={activeSong}
						data={data}
						isPlaying={isPlaying}
						i={i}
						song={song}
					/>
				))}
			</div>
		</div>
	);
}

export default Search;
