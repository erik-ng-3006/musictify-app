import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam-core.p.rapidapi.com',
		prepareHeaders: () =>
			new Headers({
				'X-RapidAPI-Key':
					'c30d4cb11cmsh96d85945474621bp16bd92jsn59adb28b9184',
				'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
			}),
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({
			query: () => '/v1/charts/world',
		}),
		getSongsByGenre: builder.query({
			query: (genreListId) =>
				`/v1/charts/genre-world?genre_code=${genreListId}`,
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: ({ artistId }) =>
				`/v1/artists/details?artist_id=${artistId}`,
		}),
		getSongsByCountry: builder.query({
			query: ({ countryCode }) =>
				`/v1/charts/country?country_code=${countryCode}`,
		}),
		getSongsBySearch: builder.query({
			query: (searchTerm) =>
				`/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
	useGetArtistDetailsQuery,
	useGetSongsByCountryQuery,
	useGetSongsByGenreQuery,
	useGetSongsBySearchQuery,
} = shazamCoreApi;
