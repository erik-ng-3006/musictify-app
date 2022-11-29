import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

function SongDetails() {
	const dispatch = useDispatch();
	const { songid, id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);

	const { data: songData, isFetching: isFetchingSongDetails } =
		useGetSongDetailsQuery({ songid });

	const {
		data,
		isFetching: isFetchingRelatedSongs,
		error,
	} = useGetSongRelatedQuery({ songid });

	const handlePlayClick = (song, data, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	if (isFetchingSongDetails || isFetchingRelatedSongs)
		return <Loader title='Searching song details' />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<DetailsHeader songData={songData} artistId={artistId} />
			<div className='mb-10'>
				<h2 className='text-white font-bold text-3xl'>Lyrics:</h2>
				<div className='mt-5'>
					{songData?.sections[1].type === 'LYRICS' ? (
						songData?.sections[1].text.map((line, i) => {
							return (
								<p
									className='text-gray-400 text-base my-1'
									key={`lyrics-${line}-${i}`}
								>
									{line}
								</p>
							);
						})
					) : (
						<p className='text-gray-400 text-base my-1'>
							Sorry, No lyrics found!
						</p>
					)}
				</div>
			</div>
			<RelatedSongs
				artistId={artistId}
				data={data}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePlayClick={handlePlayClick}
				handlePauseClick={handlePauseClick}
			/>
		</div>
	);
}

export default SongDetails;
