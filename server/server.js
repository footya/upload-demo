import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from  '../webpack.config';
const app = new express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use((req, res)=>{
    res.sendFile(path.join(__dirname, '../index.html'));
});
app.listen(3001, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.info('==> http://127.0.0.1:%s/ running');
    }
});
