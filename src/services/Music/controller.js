const Songs = require('../../models/songs');

class SongController {
    // [get] /musics/
    async home(req, res, next) {
        let songs = [];
        try {
            songs = await Songs.find({});
        } catch (err) {
            console.log(new Error(err));
        }

        res.render('music/home', {
            songs,
        });
    }

    create(req, res, next) {}
}

module.exports = new SongController();
