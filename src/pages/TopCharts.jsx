import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Loader, SongCard, Error } from '../components';

function TopCharts() {
	const { isPlaying, activeSong } = useSelector((state) => state.player);

	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading top charts...' />;

	if (error) return <Error />;
	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl mt-4 mb-10 text-white text-left'>
				Discover Top Charts
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data?.map((song, i) => (
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

export default TopCharts;
