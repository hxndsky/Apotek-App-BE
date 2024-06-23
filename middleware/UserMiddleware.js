import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    let token;
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        
        token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Superadmin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};

export const superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== 'Superadmin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};
