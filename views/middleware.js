const Listing =require("../models/listing");
const Review =require("../models/review");
const isLogin= (req,res,next ) => {
   
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login First");
        res.redirect("/users/login");
    }
    next();
};

const saveRedirectUrl= (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

const isOwner =async (req, res,next) =>{
    let {id} =req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You don`t have permission to edit");
       return res.redirect(`/listings/${id}`);
    }
    next();
};

const isAuthor= async (req, res,next) =>{
    let {id,r_id} =req.params;
    let r =await Review.findById(r_id);
    if(!r.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You are did not create the review");
       return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports ={isLogin,saveRedirectUrl,isOwner,isAuthor};
