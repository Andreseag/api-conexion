import { pool } from "../db/db.js";

export const deleteMediaId= async (req, res) => {
    let {id} = req.params;
    let sqlDeleteMedia = "DELETE FROM media WHERE `media`.`id` = "+id;
    let sqlpgDeleteMedia = "DELETE FROM media WHERE id = "+id;
    try {
        await pool.query(sqlpgDeleteMedia);  
        return res.status(200).json({ message: "Process Delete Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error delete news" });
    }
};

export const updateMediaId= async (req, res) => {
    const { id } = req.params;
    const { type, media, reference } = req.body;
    let sql = null;
    try {

        if (type) {
            sql ="UPDATE media SET type = '"+type+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (media) {
            sql ="UPDATE media SET media  = '"+media+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (reference) {
            sql ="UPDATE media SET reference  = '"+reference+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        /*        
        await pool.query(
            "UPDATE media SET type = IFNULL(?, type), media = IFNULL(?, media), reference = IFNULL(?, reference), updatedate = now()  WHERE id = ?",
            [type, media, reference, id]
        ); 
        */


        return res.status(200).json({ message: "Process update Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error update media" });
    }
};