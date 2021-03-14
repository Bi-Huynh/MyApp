const Songs = require('../../models/songs');

class SongController {
    // [get] /musics/
    async home(req, res, next) {
        let songs = [];
        try {
            songs = await Songs.find({});
        } catch (err) {
            console.log(new Error(err));
        } finally {
            res.json(songs);
        }
    }

    create(req, res, next) {}

    async getSong(req, res, next) {
        let song = {};
        let _id = req.params.id;
        try {
            song = await Songs.findById(_id);
        } catch (err) {
            console.log(new Error(err));
        } finally {
            res.json(song);
        }
    }
}

module.exports = new SongController();
