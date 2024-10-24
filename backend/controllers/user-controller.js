const User = require('../app/db/models/user');
const sendEmail = require('../utils/email');
const argon2 = require('argon2');

class UserController {

  showRegister(req, res) {
    res.render('pages/auth/register');
  }

  showForgetPassword(req, res) {
    res.render('pages/auth/forgot_password', {
      title: 'Forget Password',
      layout: 'layouts/login'
    });
  }

  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { email, newPassword, repeatPassword } = req.body;
  
      const user = await User.findOne({ email, passwordResetExpires: { $gt: Date.now() } });
  
      if (req.method === 'GET') {
        // Render the reset password form
        return res.render('pages/auth/reset_password', {
          title: 'Reset Password',
          layout: 'layouts/login',
          token: token,
          form: {},
          error: ''
        });
      }

      if (!user) {
        console.log('Token wygasł lub jest nieprawidłowy');
        return res.render('pages/auth/reset_password', {
          title: 'Reset Password',
          layout: 'layouts/login',
          token: token,
          form: req.body,
          error: 'Token wygasł lub jest nieprawidłowy'
        });
      }
  
      // Handle the password reset logic for POST request
      if (!newPassword) {
        console.log('Password is required');
        return res.render('pages/auth/reset_password', {
          title: 'Reset Password',
          layout: 'layouts/login',
          token: token,
          form: req.body,
          error: 'Password is required'
        });
      }
  
      if (newPassword !== repeatPassword) {
        console.log('Passwords do not match');
        return res.render('pages/auth/reset_password', {
          title: 'Reset Password',
          layout: 'layouts/login',
          token: token,
          form: req.body,
          error: 'Passwords do not match'
        });
      }
  
      if (newPassword.length < 5) {
        console.log('Password must be at least 5 characters long');
        return next(new AppError('Password must be at least 5 characters long', 400));
      }
  
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
  
      res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
      });
  
    } catch (error) {
      next(error);
    }
  }
  
  async forgetPassword(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('user not found');
      }
      const token = await user.generatePasswordResetToken();

      const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${token}`;
      const message = `Prośba o zresetowanie hasła: Proszę kliknąć link, aby zresetować hasło \n\n ${resetUrl}\n\n Ten link wygaśnie za 1 godzinę`;

      try{
        await sendEmail({
          email: user.email,
          subject: 'Resetowanie hasła',
          message
        });

        res.render('pages/auth/forgot_password', {
          form: req.body,
          message: 'Link do zresetowania hasła został wysłany. Sprawdź email.!',
          layout: 'layouts/login'
        });
      }catch(e){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        return next(new AppError('There was an error sending the email. Try again later!', 500));
      }

    } catch (e) {
      res.render('pages/auth/forgot_password', {
        form: req.body,
        errors: e.message,
        layout: 'layouts/login'
      });
    }
  }

  async register(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    try {
      await user.save();
      res.redirect('/admin/add');
    } catch (e) {
      res.render('pages/auth/register', {
        errors: e.errors,
        form: req.body
      });
    }
  }

  showLogin(req, res) {
    // Check if the user is already logged in
    if (req.session.user) {
      // User is logged in, redirect to /admin
      return res.redirect('/admin');
    }
    // User is not logged in, render the login page
    res.render('pages/auth/login', { 
      title: 'Login',
      layout: 'layouts/login'
    });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('user not found');
      } 

      const isValidPassword = await user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error('password not valid');
      }
      console.log('User logged in');
      // login
      req.session.user = user;
      res.redirect('/admin/add');
    } catch (e) {
      res.render('pages/auth/login', {
        form: req.body,
        errors: e.message
      });
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }

  showProfile(req, res) {
    res.render('pages/auth/profile', {
      form: req.session.user
    });
  }

  async update(req, res) {
    const user = await User.findById(req.session.user._id);
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    try {
      await user.save();
      req.session.user = user;
      res.redirect('back');
    } catch (e) {
      res.render('pages/auth/profile', {
        errors: e.errors,
        form: req.body
      });
    }
  }

}

module.exports = new UserController();