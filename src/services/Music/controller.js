import { Songs } from '../../models/songs.js';
import pug from 'pug';

// [get] /music/
const home = async (req, res, next) => {
    let songs = [];
    try {
        songs = await Songs.find({});
    } catch (err) {
        console.log(new Error(err));
    } finally {
        res.render('music/home', {
            _songs: songs,
        });

        // res.json({ songs });
    }
};

// [get] /music/create
const create = (req, res, next) => {
    res.render('/');
};

// [get] /music/:index
const getSong = async (req, res, next) => {
    let song = {},
        songs = [];
    let slug = req.params.slug;
    try {
        [song, songs] = await Promise.all([
            Songs.findOne({ slug }),
            Songs.find({}),
        ]);
    } catch (err) {
        console.log(new Error(err));
    } finally {
        res.render('music/home', {
            _songs: songs,
            _song: song,
        });
    }
};

export { home, create, getSong };
