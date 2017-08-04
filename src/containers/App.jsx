import React, { Component} from 'react';
import Upload from 'rc-upload';
import './app.css';
export default class App extends Component{
	constructor(props){
		super(props);
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
	        console.log('onProgress', Math.round(step.percent), file.name);
	      },
	      onError(err) {
	        console.log('onError', err);
	      },
	    };
	    this.state = {
	      destroyed: false,
	    };
	}
    render() {
        return (
            <div className="app">
                <h2>测试上传</h2>
                <Upload {...this.uploaderProps}>开始上传</Upload>
            </div>
        );
    }
};
