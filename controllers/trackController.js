var bodyParser=require('body-parser');
module.exports=function(app){ 
var mongoose= require('mongoose');
mongoose.connect('mongodb+srv://username:password@databasecluster/DatabaseName?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true, serverSelectionTimeoutMS: 30000})
.catch(err => {
    console.error("Error connecting to mongo", err);
  })
.then(x => {
    console.log(
      `Connected to Mongo!"`
    );
/*Replace the above connection string with the actual connection string of your MongoDB database*/
var trackSchema= new mongoose.Schema({    
    trackName:String,
    artistName:String,
    albumName:String,
    albumYear:String,
    albumGenre:String,  
    trackPrice:String
 });
var Track=mongoose.model('Track',trackSchema);
var userCartSchema = new mongoose.Schema({
    username:String,
    trackid:String,
    trackname:String,
    quantity:String,
    unitprice:String
});
var CartItem = mongoose.model('userCart',userCartSchema);
var urlencodedParser=bodyParser.urlencoded({extended:false});     
    app.get('/track',function(req,res){
        Track.find({},function(err,data){
                if(err) throw err;
                if(req.query.username!=null)
                 {
                    res.render('track-list',{tracks: data,title: 'Product List', username:req.query.username});
                 }
                 else
                 {
                    res.render('track-list',{tracks: data,title: 'Product List', username:''});
                 }                
        });
    });
    app.get('/track-list',function(req,res){
        Track.find({},function(err,data){
                 if(err) throw err;
                 if(req.query.username!=null)
                 {
                    res.render('track-list',{tracks: data,title: 'Product List', username:req.query.username});
                 }
                 else
                 {
                    res.render('track-list',{tracks: data,title: 'Product List', username:''});
                 }                 
         });
     });
     app.get('/track-add',function(req,res){
        Track.find({},function(err,data){
                 if(err) throw err;
                 if(req.query.username!=null)
                 {
                    res.render('track-add',{tracks: data,title: 'Add Track', username:req.query.username});
                 }
                 else
                 {
                    res.render('track-add',{tracks: data,title: 'Add Track', username:''});
                 }
         });
     });
    app.delete('/track/:_id',function(req,res){        
        Track.find({_id: req.params._id})
              .remove(function(err,data){                  
                  if(err) throw err;
                  if(req.query.username!=null)
                  {
                    res.render('track-add',{tracks: data,title: 'Add Track', username:req.query.username});
                  }
                  else
                  {
                    res.render('track-add',{tracks: data,title: 'Add Track', username:''});
                  }                  
         });
     });
    app.post('/track-add',urlencodedParser,function(req,res){
        var newTrack= Track(req.body).save(function(err,data){
            if(err) throw err;  
            if(req.query.username!=null)
            {          
                res.render('track-add',{tracks:data, title:'Track', username:req.query.username});
            }
            else
            {
                res.render('track-add',{tracks:data, title:'Track', username:''});
            }
        });       
    });
    app.post('/cart',urlencodedParser,function(req,res){
        var newCartItem=CartItem(req.body).save(function(err,data){
            if(err) throw err;   
            if(req.query.username!=null)
            {
                res.render('cart',{cartitems:data, title:'Shopping Cart', username:req.query.username});
            }
            else
            {
                res.render('cart',{cartitems:data, title:'Shopping Cart', username:''});
            }
        });        
    });
    app.get('/cart',function(req,res){
        CartItem.find({username: req.query.username},function(err,data){
            if(err) throw err;
            if(req.query.username!=null)
            {
                //console.log(data);
                res.render('cart',{cartitems:data, title:'Shopping Cart', username:req.query.username});
            }
            else
            {
                res.render('cart',{cartitems:data, title:'Shopping Cart', username:''});
            }               
        });
    });
    app.delete('/cart/:_id',function(req,res){        
        CartItem.find({_id: req.params._id})
              .remove(function(err,data){                  
                  if(err) throw err;
                  if(req.query.username!=null)
                    {
                        res.render('cart',{cartitems:data, title:'Shopping Cart', username:req.query.username});
                    }
                    else
                    {
                        res.render('cart',{cartitems:data, title:'Shopping Cart', username:''});
                    }              
         });
     });
});
};