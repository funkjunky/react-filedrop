import React from 'react';

class FileDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragHovering: false,
            dragActive: false,
            _globalTally: 0,
            _localTally: 0
        };

        this._dragEnter = () => {
            if(this.state._globalTally == 0)
                this.setState({ dragActive: true });
            this.setState({ _globalTally: this.state._globalTally + 1 });
        };
        this._dragLeave = () => {
            if(this.state._globalTally == 1)
                this.setState({ dragActive: false });
            this.setState({ _globalTally: this.state._globalTally - 1 });
        }
    }

    componentDidMount = () => {
        this.addEvents();
    }

    getClass = () => {
        if(this.state.dragHover)
            return this.props.hoverClass;
        else if(this.state.dragActive)
            return this.props.activeClass;
        else
            return this.props.className;
    }

    dragEnter = () => {
        if(this.state._localTally == 0)
            this.setState({ dragHover: true });
        this.setState({ _localTally: this.state._localTally + 1 });
    }

    dragLeave = () => {
        if(this.state._localTally == 1)
            this.setState({ dragHover: false });
        this.setState({ _localTally: this.state._localTally - 1 });
    }

    getStyle = () => {
        if(this.state.dragHover)
            return this.props.hoverStyle;
        else if(this.state.dragActive)
            return this.props.activeStyle;
        else
            return this.props.style;
    }

    render = () => {
        return (
        <div
            className={ this.getClass() }
            style={ this.getStyle() }
            onDrop={ this.handleDrop }
            onDragEnter={ () => this.dragEnter() }
            onDragLeave={ () => this.dragLeave() }
        >
            { this.props.children }
        </div>
    )}

    handleDrop = (event) => {
        event.preventDefault();
        this.props.onDrop(event);
    }

    addEvents = () => {
        document.addEventListener('dragenter', this._dragEnter);
        document.addEventListener('dragleave', this._dragLeave);
    }

    componentWillUnmount = () => {
        document.removeEventListener('dragenter', this._dragEnter);
        document.removeEventListener('dragleave', this._dragLeave);
    }
}

FileDrop.defaultProps = {
    hoverClass: '',
    activeClass: '',
    hoverStyle: {},
    activeStyle: {},
    onDrop: () => {},

    style: {},
    className: ''
};

export default FileDrop;
