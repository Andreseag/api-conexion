import { pool } from "../db/db.js";

export const insertNews = async (data) => {
	try {
        /*
		const [rows] = await pool.query(
		  "INSERT INTO `news` (`id`, `title`, `description`, `author`, `publicationdate`, `newsbody`, `discharges`, `creaciondate`, `updatedate`) VALUES (NULL, ?, ?, ?, ?, ?, ?, NOW(), NULL);",
		  [data.title, data.description, data.author, data.publicationdate, data.newsbody, data.discharges]
		);
		return rows.insertId;
        */
        const { rows }= await pool.query(
            "INSERT INTO news (title, description, author, publicationdate, newsbody, discharges, creaciondate, updatedate) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NULL) RETURNING id;",
            [data.title, data.description, data.author, data.publicationdate, data.newsbody, data.discharges]
        );
        return rows[0].id;
	} catch (error) {
		console.log(error);
        return false;
	}
};

export const insertMedia = async (newsId,data) => {
	try {
        /*
		await pool.query(
		  "INSERT INTO `media` (`id`, `news`, `type`, `media`, `reference`, `creaciondate`, `updatedate`) VALUES (NULL, ? , ?, ?, ?, now(), NULL);",
		  [newsId, data.type, data.media, data.reference]
		);
        */
        await pool.query(
            "INSERT INTO media (id, news, type, media, reference, creaciondate, updatedate) VALUES (DEFAULT, $1, $2, $3, $4, NOW(), NULL);",
            [newsId, data.type, data.media, data.reference]
          );   
	} catch (error) {
		console.log(error);
	}
};

export const createNews= async (req, res) => {
    let newsId = null;
    const { news, media } = req.body;
    try {
        newsId = await insertNews(news);
        if (newsId != false) {
            media.forEach(row => {
                insertMedia(newsId,row);
            });
            return res.status(200).json({ message: "complete process", id:newsId });
        }else{
            return res.status(500).json({ message: "error creating the news" });
        }
    } catch (error) {
        return res.status(500).json({ message: "error creating the news" });
    }
};

const prepareSqlId = (params) => {
    const { id } = params;
    let sql = 'SELECT id, title, description, author, publicationdate, discharges, creaciondate, newsbody FROM news';
    sql += ` WHERE id = ${id}`;
    return sql;
};

export const getNewsId= async (req, res) => {
    let sql = prepareSqlId(req.params);
    try {
        const resultQuery = await pool.query(sql);
        const resultlistNews = [];
        for (const row of resultQuery.rows) {
            const mediaQuery = `SELECT * FROM media WHERE news = '${row.id}'`;
            const result = await pool.query(mediaQuery);
            const mediaRows = result.rows;
            const formattedPublicationDate = row.publicationdate.toLocaleDateString();
            const formattedNews = {
                news: {
                id: row.id,
                title: row.title,
                description: row.description,
                author: row.author,
                publicationdate: formattedPublicationDate,
                newsbody: row.newsbody,
                discharges: row.discharges,
                },
                media: mediaRows.map((mediaRow) => ({
                id: mediaRow.id,
                type: mediaRow.type,
                media: mediaRow.media,
                reference: mediaRow.reference,
                })),
            };
            resultlistNews.push(formattedNews);
        }
        res.json({ result: resultlistNews });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error get news" });
    }
};

const prepareSql = (params) => {
    let sql = 'SELECT id, title, description, author, publicationdate, discharges, creaciondate newsbody FROM news';
    let sqlNum = 'SELECT COUNT(1) AS total  FROM news';
    const {title, author, publicationdate, page, perPage } = params;
    const conditions = [];

        if (title) {
            conditions.push(`title LIKE '%${title}%'`);
        }

        if (author) {
            conditions.push(`author LIKE '%${author}%'`);
        }

        if (publicationdate) {
            if (publicationdate.includes(',')) {
                const [startDate, endDate] = publicationdate.split(',');
                conditions.push(`publicationdate BETWEEN '${startDate}' AND '${endDate}'`);
            } else {
                conditions.push(`publicationdate = '${publicationdate}'`);
            }
        }
  
        if (conditions.length > 0) {
            sql += ` WHERE ${conditions.join(' AND ')}`;
            sqlNum += ` WHERE ${conditions.join(' AND ')}`;
        }

    const limit = perPage || 20;
    const offset = (page - 1) * limit || 0;
    sql += ` LIMIT ${limit} OFFSET ${offset}`;
    const selectPage = page==undefined?1:page;
    const prepare = {sql, sqlNum, page:selectPage, perPage:limit} 

    return prepare;
};

export const getNews= async (req, res) => {
    let prepare = prepareSql(req.query);
    try {
        const resultRows = await pool.query(prepare.sql);  
        const rowsNum = await pool.query(prepare.sqlNum);
        let numResult = rowsNum.rows[0].total;
        let totalPage = Math.ceil(numResult/prepare.perPage);
        const resultlistNews = [];
        for (const row of resultRows.rows) {
            const mediaQuery = `SELECT * FROM media WHERE news = '${row.id}'`;
            const result = await pool.query(mediaQuery);
            const mediaRows = result.rows;
            const formattedPublicationDate = row.publicationdate.toLocaleDateString();
            const formattedNews = {
                news: {
                id: row.id,
                title: row.title,
                description: row.description,
                author: row.author,
                publicationdate: formattedPublicationDate,
                newsbody: row.newsbody,
                discharges: row.discharges,
                },
                media: mediaRows.map((mediaRow) => ({
                id: mediaRow.id,
                type: mediaRow.type,
                media: mediaRow.media,
                reference: mediaRow.reference,
                })),
            };
            resultlistNews.push(formattedNews);
        }
        res.json({ result: resultlistNews , totalPage, page: prepare.page });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error get news" });
    }
};

export const deleteNewsId= async (req, res) => {
    let {id} = req.params;
    let sqlDeleteMedia = "DELETE FROM media WHERE `media`.`news` = "+id;
    let sqlDeleteNews = "DELETE FROM news WHERE `news`.`id` = "+id;
    let sqlpgDeleteMedia = "DELETE FROM media WHERE news = '"+id+"'";
    let sqlpgDeleteNews = "DELETE FROM news WHERE id = '"+id+"'";
    try {
        await pool.query(sqlpgDeleteMedia);  
        await pool.query(sqlpgDeleteNews);
        return res.status(200).json({ message: "Process Delete Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error delete news" });
    }
};

const updateMedia= async (params) => {
    const {id, type, media, reference } = params;
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error update media" });
    }
};

export const updateNewsId= async (req, res) => {
    let {id} = req.params;
    const {news, media} = req.body;
    const {title, description, author, publicationdate, newsbody, discharges} = news;
    try {
        if (title) {
            sql ="UPDATE news SET title = '"+title+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (description) {
            sql ="UPDATE news SET description  = '"+description+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (author) {
            sql ="UPDATE news SET author  = '"+author+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (publicationdate) {
            sql ="UPDATE news SET publicationdate = '"+publicationdate+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (newsbody) {
            sql ="UPDATE news SET newsbody  = '"+newsbody+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        if (discharges) {
            sql ="UPDATE news SET discharges  = '"+discharges+"', updatedate = NOW() WHERE id = '"+id+"'";
            await pool.query(sql);          
        }
        /*
        await pool.query(
            "UPDATE news SET title = IFNULL(?, title), description = IFNULL(?, description), author = IFNULL(?, author), publicationdate = IFNULL(?, publicationdate), newsbody = IFNULL(?, newsbody), discharges = IFNULL(?, discharges), updatedate = now()  WHERE id = ?",
            [title, description, author, publicationdate, newsbody, discharges, id]
        );
        */
        media.forEach(row => {
            updateMedia(row);
        });
        return res.status(200).json({ message: "Process update Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error update news" });
    }
};