"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSong = exports.create = exports.home = void 0;

require("core-js/modules/es.promise.js");

const Songs = require('../../models/songs'); // mở comment để chạy crs cho file index.html
// class SongController {
//     // [get] /musics/
//     async home(req, res, next) {
//         let songs = [];
//         try {
//             songs = await Songs.find({});
//         } catch (err) {
//             console.log(new Error(err));
//         } finally {
//             res.json(songs);
//         }
//     }
//     create(req, res, next) {}
//     async getSong(req, res, next) {
//         let song = {};
//         let _id = req.params.id;
//         try {
//             song = await Songs.findById(_id);
//         } catch (err) {
//             console.log(new Error(err));
//         } finally {
//             res.json(song);
//         }
//     }
// }
// [get] /musics/


const home = async (req, res, next) => {
  let songs = [];

  try {
    songs = await Songs.find({});
  } catch (err) {
    console.log(new Error(err));
  } finally {
    res.locals.songs = songs;
    res.render('music/home');
  }
}; // [get] /musics/create


exports.home = home;

const create = async (req, res, next) => {
  res.json({
    create: 'hi page create'
  });
}; // [get] /musics/:id


exports.create = create;

const getSong = async (req, res, next) => {
  let song = {};
  let _id = req.params.id;

  try {
    song = await Songs.findById(_id);
  } catch (err) {
    console.log(new Error(err));
  } finally {
    res.render('music/home', {
      song
    });
  }
}; // class SongController {
//     // [get] /musics/
//     async home(req, res, next) {
//         let songs = [];
//         try {
//             songs = await Songs.find({});
//         } catch (err) {
//             console.log(new Error(err));
//         } finally {
//             res.locals.songs = songs;
//             res.render('music/home');
//         }
//     }
//     // [get] /musics/create
//     async create(req, res, next) {
//         res.json({ create: 'hi page create' });
//     }
//     // [get] /musics/:id
//     async getSong(req, res, next) {
//         let song = {};
//         let _id = req.params.id;
//         try {
//             song = await Songs.findById(_id);
//         } catch (err) {
//             console.log(new Error(err));
//         } finally {
//             res.render('music/home', {
//                 song,
//             });
//         }
//     }
// }
// module.exports = new SongController();


exports.getSong = getSong;