const express = require('express')
const mongoose = require('mongoose')

const articleRouter = require("./routes/articles")
const Article = require('./models/article')

const methodOverride = require('method-override')

const app = express()

const PORT = 8000;

mongoose.connect('mongodb+srv://arvind01:JEj12cZipaCdYS6B@cluster0.sulwmby.mongodb.net/BlogWebsite').then(() => console.log("MongoDB connected"))
app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => console.log(`SERVER STARTED AT:${PORT}`))
