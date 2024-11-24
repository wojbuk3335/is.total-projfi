const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sanitize = require('sanitize-filename');
const crypto = require('crypto');
const axios = require('axios');
const authMiddleware = require('../middleware/auth-middleware');
const checkAuthMiddleware = require('../middleware/check-auth-middleware');
const isAuthMiddleware = require('../middleware/is-auth-middleware');
const pageController = require('../controllers/page-controller');
const UserController = require('../controllers/user-controller');

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

// Endpoint do weryfikacji konfiguracji
router.get('/pharmapass/verification', async (req, res) => {
    try {
        const response = await axios.get('https://rcpharmapass.epph.pl/verification', {
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Client-Secret': process.env.CLIENT_SECRET
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ errors: { code: '400', message: 'Verification failed' } });
    }
});

// Endpoint do logowania
router.get('/pharmapass/login', (req, res) => {
    res.redirect('https://rcpharmapass.epph.pl/login');
});

// Endpoint do pobierania danych użytkownika
router.get('/pharmapass/user', authMiddleware, (req, res) => {
    res.status(200).json(req.user);
});

// Endpoint do pobierania zgód konkursowych
router.get('/pharmapass/agreements', authMiddleware, async (req, res) => {
    try {
        const response = await axios.get('https://rcpharmapass.epph.pl/agreements', {
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Client-Secret': process.env.CLIENT_SECRET,
                'Authorization': `Bearer ${req.cookies['pharmapass-jar']}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ errors: { code: '400', message: 'Failed to fetch agreements' } });
    }
});

// Endpoint do wylogowania
router.get('/pharmapass/logout', (req, res) => {
    res.clearCookie('pharmapass-jar');
    res.redirect('https://rcpharmapass.epph.pl/logout');
});

router.get('/admin/login', checkAuthMiddleware, UserController.showLogin);
router.get('/admin/home', isAuthMiddleware, pageController.showHome);
router.post('/admin/login', UserController.login);
router.get('/admin/logout', UserController.logout);
router.get('/admin/register', isAuthMiddleware, UserController.showRegister);
router.post('/admin/register', isAuthMiddleware, UserController.register);
router.get('/admin/profil', isAuthMiddleware, UserController.showProfile);
router.post('/admin/profil', isAuthMiddleware, UserController.update);

router.get('/admin/forgetPassword', UserController.showForgetPassword);
router.post('/admin/forgetPassword', UserController.forgetPassword);
router.get('/admin/resetPassword/:token', UserController.resetPassword);
router.post('/admin/resetPassword/:token', UserController.resetPassword);

router.get('/video', isAuthMiddleware, pageController.ShowFilm);
router.get('/admin/add', isAuthMiddleware, pageController.showAdd);
router.post('/admin/add', isAuthMiddleware, upload.any(), pageController.AddData);
router.get('/admin/edit', isAuthMiddleware, pageController.ShowEdit);
router.get('/admin/edit/section/:id', isAuthMiddleware, pageController.EditSection);
router.get('/admin/delete/:id', isAuthMiddleware, pageController.DeleteData);
router.post('/admin/edit/section/:id', isAuthMiddleware, upload.any(), pageController.UpdateSection);

// Catch-all route for /admin/* to render the "Not Found" page
router.get('/admin/*', pageController.showNotFound);

// Catch-all route for all other routes to redirect to the main page
router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;