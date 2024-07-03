const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    url:{ 
      type: String,
      set:(v) => (v) ===""? "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimageio.forbes.com%2Fspecials-images%2Fimageserve%2F647facd9f5654bc6b057b386%2FCouple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island%2F960x0.jpg%3Fformat%3Djpg%26width%3D960&tbnid=2D0YsMFDT8FPDM&vet=12ahUKEwjDouumuIiFAxVjzDgGHVVRDQEQMygAegQIARBx..i&imgrefurl=https%3A%2F%2Fwww. .com%2Fsites%2Fbryanrobinson%2F2023%2F07%2F02%2Fdo-these-6-things-for-a-no-stress-summer-vacation-instead-of-an-in-office-guilt-trip%2F&docid=m4KTlfEkJevd2M&w=960&h=640&q=vacation&ved=2ahUKEwjDouumuIiFAxVjzDgGHVVRDQEQMygAegQIARBx":v, // Replace with your default image URL
    },  
    filename:String,
  },
  
  
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;