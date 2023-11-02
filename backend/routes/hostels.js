const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')
const User = require('../models/User')
const Hostel = require('../models/Hostel')
const Book = require('../models/Booking')

//@route GET api/hostels
//@description Get all hostels
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const hostels = await Hostel.find({  })
	if(!hostels){
		return res.status(200).json([])
	}
    return res.status(200).json(hostels)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
	const hostelid = req.params.id
    const hostels = await Hostel.findById(hostelid)
	const bookings = await Book.find({hostel:hostels._id})
    return res.status(200).json({hostel:hostels,bookings:bookings})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//@route POST api/hostels
//@description Add new hostel
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() })
    }

    const { name, price, phone, type } = req.body
	
	const hostelFields = {}
	if (name) hostelFields.name = name
	if (price) hostelFields.price = price
	if (phone) hostelFields.phone = phone
	if (type) hostelFields.type = type
  

    try {
      const newHostel = new Hostel(hostelFields )

      const hostel = await newHostel.save()
      return res.status(200).json(hostel)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  },
)

//@route PUT api/hostels/:id
//@description Update a hostel
//@access Private

router.put('/:id', auth, async (req, res) => {
  const { name, price, phone, type } = req.body

  
  const hosteltFields = {}
  if (name) hosteltFields.name = name
  if (price) hosteltFields.price = price
  if (phone) hosteltFields.phone = phone
  if (type) hosteltFields.type = type

  try {
    let hoste = await Hostel.findById(req.params.id)

    if (!hostel) return res.status(404).json({ message: 'Hostel not found' })

    /*/ Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
	*/
    hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: hostelFields },
      { new: true },
    )

    return res.status(200).json(hostel)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route DELETE api/hostels/:id
//@description Delete a contact
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let hostel = await Hostel.findById(req.params.id)

    if (!hostel) return res.status(404).json({ message: 'Hostel not found' })

    
	
    await Hostel.findByIdAndRemove(req.params.id)

    return res.status(200).json({ message: 'Hostel removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
