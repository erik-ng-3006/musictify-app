import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

function SongCard({ song, i, activeSong, isPlaying, data }) {
	const dispatch = useDispatch();

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = () => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-large cursor-pointer'>
			<div className='relative w-full h-56 group'>
				<div
					className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
						activeSong === song?.title
							? 'flex bg-black bg-opacity-70'
							: 'hidden'
					}`}
				>
					<PlayPause
						activeSong={activeSong}
						isPlaying={isPlaying}
						song={song}
						handlePause={handlePauseClick}
						handlePlay={handlePlayClick}
					/>
				</div>
				<img
					src={song?.images?.coverart || '/default-image.png'}
					alt='song_img'
				/>
			</div>
			<div className='mt-4 flex flex-col'>
				<p className='font-semibold text-lg text-white truncate'>
					<Link to={`/songs/${song?.key}`}>{song.title}</Link>
				</p>
				<p className='text-sm mt-1 truncate text-gray-300'>
					<Link
						to={
							song.artists
								? `/artists/${song?.artists[0]?.adamid}`
								: '/top-artists'
						}
					>
						{song.subtitle}
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SongCard;
