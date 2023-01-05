import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    let q;
    let toSearch;
    if (req.query.search) {
        q = `SELECT * FROM posts WHERE title LIKE "%${req.query.search}%"`;
        toSearch = req.query.search;
    } else {
        q = req.query.category
            ? "SELECT * FROM posts WHERE category= ? "
            : "SELECT * FROM posts";
        toSearch = req.query.category;
    }

    db.query(q, [toSearch], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {
    const postId = parseInt(req.params.id);

    const q =
        "SELECT users.username,users.avatar,posts.* from users,posts where users.id = posts.uid and posts.id = ?";
    db.query(q, [postId], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {
    console.log("adding post", req.body);

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretKey", (err, verifiedUser) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "INSERT INTO posts(`title`,`description`,`img`,`date`,`uid`,`category`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.description,
            req.body.img,
            req.body.date,
            req.body.uid,
            req.body.category,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
};

export const deletePost = (req, res) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken)
        return res.status(401).json("Not authentiated. Please Login");

    try {
        const verifiedUser = jwt.verify(accessToken, "secretKey");
        const postId = req.params.id;
        const q = "DELETE FROM blog.posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, verifiedUser.id], (err, data) => {
            if (err)
                return res
                    .status(403)
                    .json("Forbidden access. You can delete only your post!");

            return res.json("Post has been deleted!");
        });
    } catch (err) {
        return res.json(err, "invalid JSON Web Token");
    }
};

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretKey", (err, verifiedUser) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const q =
            "UPDATE posts SET `title`=?,`description`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

        const values = [
            req.body.title,
            req.body.description,
            req.body.img,
            req.body.category,
        ];

        db.query(q, [...values, postId, verifiedUser.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
};
