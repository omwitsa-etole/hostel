const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Hostel = require('../models/Hostel')
const Book = require('../models/Booking')
const History = require('../models/History')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const auth = require('../middlewares/auth')

///'/v1/booking'

router.get('/', auth, async (req, res) => {
  try {
	const userid = req.user.id
    const hostels = await Book.find({ user:userid })
	const found = []
	for(let i = 0;i<hostels.length;i++){
		const load = {}
		
		const hs = await Hostel.findById(hostels[i].hostel);
		if(hs){
			load.name = hs.name
			load.price = hs.price
			load.type = hs.type
			load.saved = hostels[i].saved
			load.date = hostels[i].date
			load._id = hostels[i]._id
			load.complete = hostels[i].complete
			found.push(load)
		}
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

router.get('/:id', auth, async (req, res) => {
    
    const userid = req.user.id
	const hostelid = req.params.id
	
    try {
		const hostels = await Book.findById(hostelid)
		
		if(hostels){
			const load = {}
			const hs = await Hostel.findById(hostels.hostel);
			if(hs){
				load.name = hs.name
				load.user = hostels.user
				load.price = hs.price
				load.type = hs.type
				load.saved = hostels.saved
				load.complete = hostels.complete
				load.date = hostels.date
				load._id = hostels._id
				load.checkin = hostels.checkin
				load.checkout = hostels.checkout
			}
			
			return res.status(200).json(load)
		}
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async (req, res) => {
  try {
	const stats = req.body
	console.log(stats)
	const hostelid = req.params.id
    const hostels = await Book.findById(hostelid)
	if(!hostels){
		return res.status(404).json({message:"No booking found"})
	}
	await Book.findByIdAndUpdate(
		hostels._id,
		{ $set: stats },
		 { new: true },
	)
	
    return res.status(200).json({message:"Updated success"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


router.get('/get/saved', auth, async (req, res) => {
  try {
	const userid = req.user.id
    const hostels = await Book.find({ user:userid })
	const found = []
	for(let i = 0;i<hostels.length;i++){
		const load = {}
		if(hostels[i].saved === true){
			const hs = await Hostel.findById(hostels[i].hostel);
			if(hs){
				load.name = hs.name
				load.price = hs.price
				load.type = hs.type
				load.saved = hostels[i].saved
				load.date = hostels[i].date
				load._id = hostels[i]._id
				load.complete = hostels[i].complete
				found.push(load)
			}
		}
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


router.put('/save/:id', auth, async (req, res) => {
  try {
	const userid = req.user.id
	const hostelid = req.params.id
    
	let book = await Book.findById(hostelid)
	console.log(book)
	if(!book){
		book = new Book()
		book.user = userid
		book.hostel = hostelid
		book.saved = true
		await book.save();
	}else{
		console.log("saved=",book.saved)
		if(book.saved === true){
			await Book.findByIdAndUpdate(
				book._id,
				{ $set: {saved:false} },
				 { new: true },
			)
		}else{
			await Book.findByIdAndUpdate(
				book._id,
				{ $set: {saved:true} },
				 { new: true },
			)
		}
	}
	
    return res.status(200).json({message:"success"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

router.put('/remove/:id', auth, async (req, res) => {
  try {
	const userid = req.user.id
	const hostelid = req.params.id
    const hostels = await Book.findOne({user:userid,hostel:hostelid})
	if(!hostels){
		return res.status(404).json({message:"No booking found"})
	}
	await Book.findByIdAndUpdate(
		hostels._id,
		{ $set: {saved:false} },
		 { new: true },
	)
	
    return res.status(200).json({message:"success"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})



router.post('/:id', auth, async (req, res) => {
    
    const userid = req.user.id
	const hostelid = req.params.id
	const fields= {complete:false} 
    try {
      let user = await User.findById(userid)
	  let booked = await Book.findOne({user:userid,hostel:hostelid})
      if (user) {
		  if(!booked){
			  let book = new Book()
			  
			  book.user = userid
			  book.hostel = hostelid
			  book.complete = false
			  book = await book.save()
			  let history = new History()
			  history.booking = book._id
			  history.user = userid
			  
			  await history.save()
			  return res.status(200).json(book)
		  }else{
			  let book = await Book.findByIdAndUpdate(
				  booked._id,
				  { $set: fields },
				  { new: true },
				)
			  return res.status(200).json(book)
		  }
		  
	  }return res.status(404).json({message:"Invalid user "})

    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
  })

router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
	const userid = req.user.id
	const bookid = req.params.id
    if (!book) return res.status(404).json({ message: 'Booking not found' })

    // Make sure user owns contact
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await Book.findByIdAndRemove(req.params.id)
	let history = History.findOne({user:userid,booking:bookid})
	if(history){
		await History.findByIdAndUpdate(
			booked._id,
		  { $set: {deleted:true,date:Date.now()} },
		  { new: true },
		)
	}

    return res.status(200).json({ message: 'Booking removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/get/history', auth, async (req, res) => {
  try {
	const userid = req.user.id
    const hostels = await History.find({ user:userid })
	const found = []
	
	for(let i = 0;i<hostels.length;i++){
		const load = {}
		
		const hs = await Book.findById(hostels[i].booking);
		const h = await Hostel.findById(hs.hostel);
		if(hs){
			load.name = h.name
			load.price = h.price
			load.type = h.type
			load.saved = hs.saved
			load.date = hs.date
			load._id = hs._id
			load.complete = hs.complete
			load.deleted = hostels[i].deleted
			load.bookdate = hostels[i].date
			found.push(load)
		}
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


router.get('/getAll/history', auth, async (req, res) => {
  try {
	
    const hostels = await Book.find({  })
	const found = []
	
	for(let i = 0;i<hostels.length;i++){
		const load = {}
		const hs = hostels[i];
		const h = await Hostel.findById(hs.hostel);
		if(h){
			load.name = h.name
			load.price = h.price
			load.type = h.type
			load.date = hs.date
			load._id = hostels[i]._id
			load.complete = hs.complete
			load.deleted = hostels[i].deleted
			load.bookdate = hostels[i].date
			found.push(load)
		}
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


router.get('/getAll/users', auth, async (req, res) => {
  try {
	
    const users = await User.find({  }).select("-password")
	const found = []
	
	for(let i = 0;i<users.length;i++){
		const load = users[i];
		const hs = users[i];
		const books= await Book.findById(hs._id);
		
		if(hs){
			load.bookings = 1
			
			found.push(load)
		}
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

router.get('/getAll/hostels', auth, async (req, res) => {
  try {
	
    const hostels = await Hostel.find({  })
	const found = []
	
	for(let i = 0;i<hostels.length;i++){
		const load = {};
		const hs = hostels[i];
		const books= await Book.find(hs._id);
		
		found.push(hs)
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


router.get('/get/deleted', auth, async (req, res) => {
  try {
	const userid = req.user.id
    const hostels = await History.find({ user:userid })
	const found = []
	for(let i = 0;i<hostels.length;i++){
		const load = {}
		if(hostels[i].deleted === true){
			const hs = await Book.findById(hostels[i].booking);
			const h = await Hostel.findById(hs.hostel);
			load.name = h.name
			load.price = h.price
			load.type = h.type
			load.saved = hs.saved
			load.date = hs.date
			load._id = hostels[i]._id
			load.complete = hs.complete
			load.deleted = hostels[i].deleted
			load.bookdate = hostels[i].date
			found.push(load)
		}
		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

module.exports = router
