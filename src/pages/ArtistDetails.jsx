import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

function ArtistDetails() {
	const { id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);

	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error,
	} = useGetArtistDetailsQuery({ artistId });

	console.log(artistData);

	if (isFetchingArtistDetails)
		return <Loader title='Searching song details' />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<DetailsHeader artistId={artistId} artistData={artistData} />
			<RelatedSongs
				artistId={artistId}
				data={Object.values(artistData?.songs)}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
}

export default ArtistDetails;
