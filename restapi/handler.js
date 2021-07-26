const htmlSpesialChar = require('htmlspecialchars');
// ! Model
const Notes = require('./db/Notes');

const addCatatan = (req, h) => {
    const { title, tags, body } = req.payload;

    if (body === '') {
        return h.response({
            status: 'fail',
            message: 'Body tidak boleh kosong',
        }).code(400);
    }
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const Note = new Notes({
        title: htmlSpesialChar(title) || 'Untitled',
        tags: htmlSpesialChar(tags).split(',') || ['no tags'],
        body: htmlSpesialChar(body) || 'Note',
        createdAt,
        updatedAt,
    });
    return Note.save()
        .then((result) => {
            return h.response({
                status: 'success',
                message: 'catatan berhasil ditambahkan',
                note: result,
            }).code(201);
        })
        .catch((error) => {
            return h.response({
                status: 'Error',
                message: `Error : ${error}`,
            }).code(500);
        });
};

const putCatatanById = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    return Notes.findOne({ _id: id })
        .then(async ({ title: oldTitle, body: oldBody }) => {
            return Notes
                .updateOne(
                    {
                        _id: id,
                    },
                    {
                        title: htmlSpesialChar(title) || oldTitle,
                        tags: htmlSpesialChar(tags).split(','),
                        body: htmlSpesialChar(body) || oldBody,
                        updatedAt: new Date().toISOString(),
                    })
                .then((result) => {
                    return h.response({
                        status: 'success',
                        message: 'data telah diubah',
                    }).code(201);
                })
                .catch((error) => (h.response({ status: 'Eror', error })));
        })
        .catch(() => {
            return h.response({
                status: 'fail',
                message: 'Gagal diubah, catatan tidak ditemukan',
            }).code(400);
        });
};

const deleteCatatanById = (req, h) => {
    const { id } = req.params;
    return Notes.deleteOne({ _id: id })
        .then(() => {
            return h.response({
                status: 'success',
                message: 'catatan telah dihapus',
            }).code(201);
        })
        .catch(() => {
            return h.response({
                status: 'fail',
                message: 'Gagal menghapus, catatan tidak ditemukan',
            }).code(400);
        });
};

const getCatatanById = (req, h) => {
    const { id } = req.params;
    const note = Notes.findOne({ _id: id });
    return note
        .then((result) => {
            return h.response({
                status: 'success',
                note: result,
            }).code(200);
        })
        .catch(() => {
            return h.response({
                status: 'fail',
                message: 'catatan tidak ditemukan',
            }).code(400);
        });
};

const getAllCatatan = async (req, h) => {
    return h.response({
        status: 'success',
        notes: await Notes.find(),
    }).code(200);
};

module.exports = {
    getAllCatatan, addCatatan,
    getCatatanById, putCatatanById,
    deleteCatatanById,
};
