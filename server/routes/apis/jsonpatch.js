const express = require('express');
const router = express.Router();
const jsonPatch = require('fast-json-patch')

const auth = require('../../middleware/auth')

router.patch('/', auth, async (req, res) => {
    const { document, patch } = req.body;

    if (!document || Object.values(document).length < 1)
        return res.status(400).json({ message: "Document must not be empty" })

    if (!patch || !Array.isArray(patch) || patch.length < 1)
        return res.status(400).json({ message: "Patch must not be empty" })

    try {

        let newDocument = await jsonPatch.applyPatch(document, patch).newDocument;
        res.status(200).json({ content: newDocument, message: "Patch successful" })

    } catch (error) {
        
        res.status(500).json(error)
    }

})

module.exports = router