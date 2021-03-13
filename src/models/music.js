const mongoose = require('mongoose');
let slug = require('mongoose-slug-generator');
let mongooseDelete = require('mongoose-delete');

const MusicSchema = new mongoose.Schema(
    {
        name: String,
        singer: String,
        path: String,
        image: String,
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);

// override lại các method để có thể xóa mềm (soft delete)
MusicSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Music', MusicSchema);
