import React, {Component} from 'react';
import Backdrop from '../../components/UI/Backdrop/backdrop';

class Layout extends Component {
    render() {
        return(
            <React.Fragment>
                <Backdrop />
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default Layout;