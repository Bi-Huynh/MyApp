import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const SongSchema = new Schema(
    {
        name: { type: String, default: 'Name Song' },
        singer: { type: String, default: 'Name Singer' },
        path: String,
        image: String,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
// override lại các method để có thể xóa mềm (soft delete)
SongSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

const Songs = mongoose.model('Song', SongSchema);

export { Songs };
