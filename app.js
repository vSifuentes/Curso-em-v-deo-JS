const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

const dbURI = 'mongodb+srv://netninja:test123@nodeblog.yysaw.mongodb.net/netninja?retryWrites=true&w=majority&appName=nodeblog'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs');



//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'));  




//mongoose 

// app.get('/add-blog', (req, res) =>{
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about new blog'
//     })
//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
    

// })

// app.get('/all-blog', (req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })


app.get('/', (req, res) => {
    res.redirect('/blogs')

});

app.get('/about', (req, res) => {
    //res.send("about page");
    res.render('about',{ title: 'About'})

});

//routes
app.use('/blogs', blogRoutes)

//redirects
//app.get('/about_us', (req, res) => {
//    res.redirect('/about');
//});

//404 error
app.use((req,res)=>{
    res.status(404).render('404',{ title: '404'})
})
