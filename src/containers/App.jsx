import React, { Component} from 'react';
import Upload from 'rc-upload';
import './app.css';
export default class App extends Component{
	constructor(props){
		super(props);
		let _this = this;
		this.uploaderProps = {
	      action: '/upload',
	      data: { a: 1, b: 2 },
	      headers: {
	        Authorization: 'xxxxxxx',
	      },
	      multiple: true,
	      beforeUpload(file) {
	        console.log('beforeUpload', file.name);
	      },
	      onStart: (file) => {
	        console.log('onStart', file.name);
	        // this.refs.inner.abort(file);
	      },
	      onSuccess(file) {
	        console.log('onSuccess', file);
	      },
	      onProgress(step, file) {
	      	_this.setState({
	      		percent: step.percent
	      	});
	        console.log('onProgress', Math.round(step.percent), file.name);
	      },
	      onError(err) {
	        console.log('onError', err);
	      },
	    };
	    this.state = {
	      destroyed: false,
	      percent: 0
	    };
	}
    render() {
        return (
            <div className="app">
                <h2>测试上传</h2>
                <p>上传进度：{this.state.percent}%</p>
                <Upload {...this.uploaderProps}>开始上传</Upload>
            </div>
        );
    }
};
