import React, {Component} from 'react';
import { connect } from 'react-redux';

class Authorization extends Component {
    render() {
        return (
            <div>
                Authorization component
            </div>
        )
    }
}
const stateCurrent = (state) => ({article: state.article});
const dispatchCurrent = (dispatch) => {};
export default connect(stateCurrent, dispatchCurrent)(Authorization);
