import { pool } from "../db/db.js";

export const deleteMediaId= async (req, res) => {
    let {id} = req.params;
    let sqlDeleteMedia = "DELETE FROM media WHERE `media`.`id` = "+id;
    try {
        await pool.query(sqlDeleteMedia);  
        return res.status(200).json({ message: "Process Delete Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error delete news" });
    }
};

export const updateMediaId= async (req, res) => {
    const { id } = req.params;
    const { type, media, reference } = req.body;
    try {
        await pool.query(
            "UPDATE media SET type = IFNULL(?, type), media = IFNULL(?, media), reference = IFNULL(?, reference), updatedate = now()  WHERE id = ?",
            [type, media, reference, id]
        ); 
        return res.status(200).json({ message: "Process update Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error update media" });
    }
};