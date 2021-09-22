import express from 'express';
import getPrices from '../services/get-prices';

const router = express.Router();

router.get('/price', async (req, res) => {
    const tsyms = req.query.tsyms as string;
    const fsyms = req.query.fsyms as string;
    const data = await getPrices(fsyms, tsyms);
    res.send(data);
});

export default router;
