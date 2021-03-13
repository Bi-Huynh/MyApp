class SiteController {
    // [get] /
    home(req, res, next) {
        res.render('layout/main');
    }
}

module.exports = new SiteController();
