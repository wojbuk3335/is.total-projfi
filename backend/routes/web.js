const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sanitize = require('sanitize-filename');
const crypto = require('crypto');

const dirPath = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, dirPath);
    },
    filename: function(req, file, cb) {
        const safeFileName = sanitize(file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'));

        // Store the original filename
        req.fileInfo = {
            originalName: safeFileName
        };

        cb(null, safeFileName);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only video files
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/avi') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const page_controller = require('../controllers/page-controller')
const UserController = require('../controllers/user-controller');


router.get('/register', UserController.showRegister);
router.post('/register', UserController.register);
router.get('/login', UserController.showLogin);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/forgetPassword', UserController.showForgetPassword);
router.post('/forgetPassword', UserController.forgetPassword);
router.get('/resetPassword/:token', UserController.resetPassword);
router.post('/resetPassword/:token', UserController.resetPassword);

//add ShowVideo route
router.get('/video', page_controller.ShowFilm);

router.get('/admin/profil', UserController.showProfile);
router.post('/admin/profil', UserController.update);

router.get('/admin',require('../middleware/is-auth-middleware'),page_controller.showHome);
router.get('/admin/add',require('../middleware/is-auth-middleware'),page_controller.showAdd);
router.post('/admin/add', require('../middleware/is-auth-middleware'), upload.any(), page_controller.AddData);
//add delete route
router.get('/admin/delete/:id',require('../middleware/is-auth-middleware'),page_controller.DeleteData);
router.get('/admin/edit',require('../middleware/is-auth-middleware'),page_controller.ShowEdit);
router.get('/admin/edit/section/:id',require('../middleware/is-auth-middleware'),page_controller.EditSection);
router.post('/admin/edit/section/:id',require('../middleware/is-auth-middleware'), upload.any(),page_controller.UpdateSection);

router.get('*', page_controller.showNotFound);

module.exports = router;


