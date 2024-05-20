import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.listen(port,(req,res) =>{
    console.log("Server is running on port : " + port);
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

// FUNCTIONALITY OF BLOG

var blogName = [];
var blogs = [];
var size=0;

app.get("/edit",(req,res)=>{
    res.render("edit.ejs", { name: blogName, noOfBlogs: size});
});

app.post("/edit", (req, res) => {
             let index = blogName.indexOf(req.body.blogname); // Find the index of the blog name
             blogs[index] = req.body.blogDesc; // Update the blog description
             res.redirect("/view");
});

app.get("/view",(req,res)=>{
    res.render("view.ejs",{ updatedBlog: blogs, name: blogName , noOfBlogs: size});
});
app.get("/delete",(req,res) =>{
    res.render("delete.ejs", { name: blogName, noOfBlogs: size})
});

app.post("/create", (req,res) =>{
    blogName[size] = req.body.blogname;
    blogs[size] = req.body.blogDesc;

    size++;
    res.render("index.ejs");
});
app.post("/delete", (req, res) => {
    let index = -1; // Initialize index to -1 in case blogname is not found
    for (let i = 0; i < size; i++) {
        if (req.body.blogname === blogName[i]) {
            index = i; // Set the index if blogname matches
            break; // Exit the loop once the blogname is found
        }
    }
    // Check if the blogname was found
    if (index !== -1) {
        // Remove the blogname and associated data from arrays
        blogName.splice(index, 1);
        blogs.splice(index, 1);
        --size;
    }

    // Render the delete.ejs template with updated data
    res.render("delete.ejs", { name: blogName, noOfBlogs: size });
});


// var temp;
// app.post("/edit",(req,res)=>{
//     for (var index = 0; index < blogName.length; index++) {
//         if (req.body.blogname===blogName[index]) {
//             if (req.body.blogDesc) {
//                 temp = index;
//                 blogs[temp] = req.body.blogDesc;
//                 res.render("edit.ejs" ,{ name:blogName, noOfBlogs: size});
//                 break;
//             } else {
//              res.render("edit.ejs", { name:blogName, noOfBlogs: size , returnedBlog: blogs[temp]});
//             }
//         }
//     }
// });

