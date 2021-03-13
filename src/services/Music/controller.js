class MusicController {
    // [get] /music/
    home(req, res, next) {
        res.render('music/home');
    }
}

module.exports = new MusicController();
