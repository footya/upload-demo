/**
 * from 表单提交服务端
 */
import express from 'express';
import multer from 'multer'; // for parsing multipart/form-data
import bodyParser from 'body-parser';
import fs from 'fs';
const app = express();
// 设定dest才真的上传
const upload = multer({
    dest: 'upload/'
});
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.get('/', function(req, res) {
    res.send('Hello World!')

});
app.all('/upload', upload.single('filename'), (req, res, next) => {
    const tmp_path = req.file.path;
    console.log(req.file);
    const target_path = 'uploads/' + req.file.originalname;
    const src = fs.createReadStream(tmp_path);
    const dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() {
        fs.unlink(tmp_path, () => {
            console.log('del tmp file');
        });
        res.send('done' + '<img src="' + target_path + '"/>');
    });
    src.on('error', function() {
        res.send('error');
    });
    console.log(tmp_path);
});
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});
app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});