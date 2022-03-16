const express=require("express")
const { getNews, postNews, getNewsById, editNews, deleteNews } = require("../controllers/newsController")
const router=express.Router()
const auth=require("../middleware/auth")

router.get('/',getNews)
router.get('/:id',getNewsById)
router.post("/",auth,postNews)
router.put("/:id",auth,editNews)
router.delete("/:id",auth,deleteNews)

module.exports=router
