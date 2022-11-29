import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { Loader, SongCard, Error } from '../components';

function AroundYou() {
	const [country, setCountry] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const { isPlaying, activeSong } = useSelector((state) => state.player);

	const { data, isFetching, error } = useGetSongsByCountryQuery({
		countryCode: country,
	});

	useEffect(() => {
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=${
					import.meta.env.VITE_GEO_API_KEY
				}`
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false));
	}, [country]);

	if (isFetching && isLoading)
		return <Loader title='Loading songs around you...' />;

	if (error && country !== '') return <Error />;
	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl mt-4 mb-10 text-white text-left'>
				Around you <span className='font-black'>{country}</span>
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

export default AroundYou;
