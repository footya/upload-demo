import React, { Component} from 'react';
import Upload from 'rc-upload';
export default class App extends Component{
    render() {
        return (
            <div className="main">
                <h2>测试上传</h2>
                <Upload />
            </div>
        );
    }
};
