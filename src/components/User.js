import React, {Component} from 'react';
import { addToArticle } from '../actions/add_article';
import { connect } from 'react-redux';

class User extends Component {
    componentDidMount() {
        this.electron = window.require('electron');
        this.electron.ipcRenderer.send('menu:add');
        this.electron.ipcRenderer.on('menu:add', (e, item) => {
            this.props.add(JSON.parse(item));
        });
    }
    render() {
        return (
            <div>
                {
                    this.props.article.map((item, index) => {
                        return <div key={index}>
                            <span>{item.title}</span>
                            <span>{item.userName}</span>
                        </div>
                    })
                }
            </div>
        )
    }
}
const stateCurrent = (state) => ({article: state.article});
const dispatchCurrent = (dispatch) => {
    return {
        add: (item, screenId) => dispatch(addToArticle(item)),
    }
}
export default connect(stateCurrent, dispatchCurrent)(User)