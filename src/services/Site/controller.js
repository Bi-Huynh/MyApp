class SiteController {
    // [get] /
    home(req, res, next) {
        res.render('layout/site');
    }
}

module.exports = new SiteController();
