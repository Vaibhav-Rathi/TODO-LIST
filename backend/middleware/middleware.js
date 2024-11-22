const authenticateUser = (req, res, next) => {
    const userCookie = req.cookies.user;
    if (!userCookie || !userCookie.id) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    req.userId = userCookie.id;
    next(); 
};

export default authenticateUser;