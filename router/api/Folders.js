const express = require("express");
const router = express.Router();
const Util=require('../../util/file_util')



// @route GET /
// @desc get the list of directories and files under the path
// @access public
router.get("api/list", (req, res) => {
    res.json(Util.dirTree2(null,"/Users/jo.applie/Projects"));
});


// @route GET /<id>
// @desc get details of the file/ folder
// @access public
router.get('api/list/:id', (req, res) => {
    const id = req.params.id;
    res.json(Util.getDetails(id));
});


module.exports = router;