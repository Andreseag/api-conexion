export const news= async (req, res) => {    
    res.json({
        "news":{
            "title": "AQUI EL TITULO", 
			"description": "AQUI LA DESCRIPCION" ,
			"author": "AQUI EL AUTOR" ,
            "publicationdate": " FECHA FORMATO 2023-08-05" ,
			"newsbody": "<HTML></HTML>" ,
			"discharges": "AQUI LOS DESCARGOS" ,
        },
        "media":[
            {
				"type": "IMAGEN,VIDEO,AUDIO",
				"media": "URL",
				"reference": "CUALQUIER DATO DE SER REQUERIDO"
            },
            {
				"type": "IMAGEN,VIDEO,AUDIO",
				"media": "URL",
				"reference": "CUALQUIER DATO DE SER REQUERIDO"
            },
            {
				"type": "IMAGEN,VIDEO,AUDIO",
				"media": "URL",
				"reference": "CUALQUIER DATO DE SER REQUERIDO"
            }
        ]
    });
};