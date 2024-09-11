import {Router} from 'express';

const router = Router();

router.get('/users/currentuser', (req, res) => {
    res.send("hi");
});

export default router;