module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/login');
    },
    isAdmin: (req, res, next) => {
        if (req.user && req.user.role === 'admin') {
            return next();
        }
        res.status(403).send('Access Denied: Admins Only');
    }
};