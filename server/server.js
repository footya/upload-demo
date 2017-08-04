import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';
import multer from 'multer';
const upload = multer({
	dest: 'upload/'
});

const app = new express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use((req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
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
		res.send({
			"data": target_path
		});
	});
	src.on('error', function() {
		res.send('error');
	});
	console.log(tmp_path);
});
app.listen(3001, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.info('==> http://127.0.0.1:%s/ running');
	}
});