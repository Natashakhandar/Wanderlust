const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
   .then(() => {
      console.log("connected to db");
   })
   .catch((err) => {
      console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("views engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

//INDEX ROUTE
app.get("/listings", async (req,res) => {
    const allListings = await  Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});
app.get("/testlisting", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 1200,
        location: "Goa",
        country: "India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful");
});


// NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    console.log(listing.image.url)
    res.render("./listings/show.ejs", {listing});
});

//CREATE ROUTE
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//EDIT ROUTE
app.get("/listings/:id/edit", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//UPDATE ROUTE
app.put("/listings/:id", async (req, res) => {
    try{
    let {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing},  { new: true });
    await updatedListing.save();
    console.log(updatedListing.image.url)
    res.redirect(`/listings/${id}`);
    }  catch (error){
        console.error(error);
    
    }
});    

//DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("server is listening to port:8080");
});
