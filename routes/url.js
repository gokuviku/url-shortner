const express = require('express');

const { handleGenerateNewShortURL } = require('../conrollers/url')
const router = express.Router()

router.post('/', handleGenerateNewShortURL)

module.exports =router