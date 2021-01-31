const express = require('express');
const router = express.Router();

router.get('/',(req,resp)=>{
    resp.send("API Tasks goes here");
});

module.exports = router;
