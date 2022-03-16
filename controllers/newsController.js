const News = require("../models/newsModel")

exports.getNews = async (req, res) => {
    try {
        let news = await News.find()
        if (news) {
            return res.status(200).json(news)
        }
    }
    catch (err) {
        return res.status(400).json({ error: err.messgae })
    }
}

exports.postNews = async (req, res) => {
    try {
        const { title, imageUrl, description } = req.body

        let news = new News({
            title: title,
            imageUrl: imageUrl,
            description: description
        })
        news = await news.save()
        if (news) {
            return res.status(201).json({ message: "news has beed posted" })
        }
    }
    catch (err) {
        return res.status(400).json({ error: err })
    }
}

exports.getNewsById = async (req, res) => {
    const { id } = req.params

    try {
        let news = await News.findById(id)
        return res.status(200).json(news)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

exports.editNews = async (req, res) => {
    try {
        const { id } = req.params
        const { title, imageUrl, description } = req.body
        let news = await News.findByIdAndUpdate(id, {
            title: title,
            imageUrl: imageUrl,
            description: description
        })
        if (!news) {
            return res.status(400).json({ error: "no news found with this Id" })
        }
        return res.status(200).json({ message: "post edited" })
    }
    catch (err) {
        return res.status(400).json({ error: err })
    }
}

exports.deleteNews = async (req, res) => {
    const { id } = req.params
    News.findByIdAndDelete(id, err => {
        if (err) {
            return res.status(400).json({ message: "failed while trying to delete id" })
        }
        return res.status(200).json({ message: `Post with Id: ${id} deleted successfully!!!` })
    })
}