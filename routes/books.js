const Book = require('../models/book')
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

router.get('', auth, async (req, res) => {
  const data = await Book.findAll()
  res.send(data)
})


router.get('/:bookid', auth, async (req, res) => {
  const { bookid } = req.params
  console.log(bookid)
  res.send(await Book.findByPk(bookid))
})

router.post('', auth, async (req, res) => {
  console.log(JSON.stringify(req.body))
  await Book.create(req.body)
  res.status(201).send("201", req.body)
})

router.put('/:bookid', auth, async (req, res) => {
  let returned
  try {
    returned = await Book.update(req.body, {
      where: { id: req.params.bookid },
      returning: true,
      plain: true
    })
    res.status(200).send("updated")

  } catch {
    res.status(500).send("some error occured")
  }

})

router.delete('/:bookid', auth, async (req, res) => {
  try {
    returned = await Book.destroy({
      where: { id: req.params.bookid },
    })
    res.status(200).send("deleted")

  } catch {
    res.status(500).send("some error occured")
  }
})

module.exports = router