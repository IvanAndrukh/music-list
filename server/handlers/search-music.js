const { makeRequest } = require('../services');

module.exports = async (req, res, next) => {
	try {
		const { artistList } = req.body;	
		const artists = artistList.map((artist) => artist.replace(/\s/g, '+'));

		const musicList = await artists.reduce(async (acc,artist) => {
			const accum = await acc;

			const url = `https://itunes.apple.com/search?term=${artist}&entity=song&attribute=allArtistTerm&limit=20`;

			const searchResult = await makeRequest(url);
			const songs = JSON.parse(searchResult).results;

			return [...accum, ...songs]
		}, []);

		const randomMusic = musicList.sort(() => 0.5 - Math.random()).slice(0,3);

		res.status(200).send(randomMusic);
	} catch (error) {
		res.status(400);
		next(error);
	}
};
