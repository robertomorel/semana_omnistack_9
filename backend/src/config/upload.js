const multer = require("multer");
const path = require("path"); 

module.exports = {
    storage: multer.diskStorage({ // -- Salvar nos arquivos físicos da aplicação
        // -- Informar qual a pasta os arquivos serão gravados 
        // -- path.resolve faz com que o endereçamento se adapte à qlqr SO
        // -- __dirname é uma var global que diz o nome do arquivo atual
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // -- Como o arquivo será formado?
        filename: (req, file, cb) => { // -- Params: requisição, arquivo, callback(chamada qndo o file tiver pronto)
            const ext = path.extname(file.originalname); 
            const name = path.basename(file.originalname, ext);
            // -- file.fieldname: nome do arquivo q veio do cliente
            // -- Date.now(): timestamp da data atual
            // -- path.extname(file.originalname): nome original da imagem com a extensão
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};