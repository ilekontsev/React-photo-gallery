const fs = require('fs');
const path = require('path')
const multiparty = require('multiparty')
const form = new multiparty.Form();

const saveImage = (req,res) => {
    try{
        const oldFile = fs.readFileSync("dataBase.json");
        const oldFileParse = JSON.parse(oldFile);
        const array = oldFileParse.images;

        form.parse(req, function(err, fields, files) {
            if(err){
                return res.status(500).send("files image not work")
            }

            const imgArray = files.image;
            const singleImg = imgArray[0];
            const newPath = path.join(__dirname + `/uploads`, `/${array.length + 1}.jpg`);
            const path_DB = (`http://localhost:5000/static/${array.length + 1}.jpg`)
            array.push(path_DB)
            readAndWriteFile(singleImg, newPath)

            oldFileParse.images = array;
            fs.writeFileSync("dataBase.json", JSON.stringify(oldFileParse,null,2));

            return res.status(200).send("File uploaded to: ");
        });
    }catch(err){
        res.status(500).send("error with saving images",err)
    }

}

function readAndWriteFile(singleImg, newPath) {
    fs.readFile(singleImg.path , function(err,data) {
        fs.writeFile(newPath, data, function(err) {
            if (err) console.log('ERRRRRR!! :'+err);
            console.log('Fitxer: '+singleImg.originalFilename +' - '+ newPath);
        })
    })
}

const getData = (req,res) =>{
    try{
        const count = req.body.count ||  0
        const images_db = JSON.parse(fs.readFileSync("dataBase.json"))
        const titles = JSON.parse(fs.readFileSync('dataBaseText.json'))

        const images = []

        for (let i= count; i <= 8+count; i++){
            if(images_db.images[i]){
                images.push(images_db.images[i])
            }
        }
        const pageBack = count === 0
        const pageFoward = images_db.images.length < 8 + count
        res.status(200).send({images,titles,pageBack,pageFoward})
    }catch (err){
        res.status(500).send("dont work",err)
    }

}

const setTitle = (req,res) => {
    try{
        const {value, text} = req.body
        if(!value && !text){
            return res.status(403).send("text value wasn't sent")
        }
        const oldFile = fs.readFileSync("dataBaseText.json");
        const oldFileParse = JSON.parse(oldFile);
        if(text === 'title'){
            oldFileParse.header = value
        }else if(text==='desc'){
            oldFileParse.desc = value
        }
        fs.writeFileSync("dataBaseText.json", JSON.stringify(oldFileParse,null,2));
        res.status(200).send("title updated")
    }catch(err){
        res.status(500).send("dont set title",err)
    }

}

const deleteImage = (req,res) => {
    try{
        const oldFile = fs.readFileSync("dataBase.json");
        const oldFileParse = JSON.parse(oldFile);
        oldFileParse.images = [];
        fs.writeFileSync("dataBase.json", JSON.stringify(oldFileParse,null,2));
        fs.readdir('uploads', (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join('uploads', file), err => {
                    if (err) throw err;
                });
            }
        });
        res.status(200).send('images was deleted')
    }catch(err){
        res.status(500).send("dont delete image", err)
    }

}

module.exports = {saveImage, getData,setTitle,deleteImage }