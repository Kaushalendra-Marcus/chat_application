import express from 'express';
const router = express.Router();

// Minimal test route
router.get('/test-route/:validParam', (req, res) => {
  res.send(`Working! Param: ${req.params.validParam}`);
});

export default router;