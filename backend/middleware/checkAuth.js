const checkAuth = (req, res, next) => {
    const adminCookie = req.cookies.adminCookie;
  
    if (adminCookie) {
      req.isAuthenticated = true;
      req.adminUsername = adminCookie;
    } else {
      req.isAuthenticated = false;
      req.adminUsername = null;
    }
  
    next();
  };
  
  app.use(checkAuth);
  