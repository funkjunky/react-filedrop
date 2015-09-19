var React = require('react');
var Superagent = require('superagent');

var Filedrop = React.createClass({
    render: function() {
        return (
            <div className="dropZone" onDrop={this.handleDrop} onDragOver={this.preventDefault} onDragEnter={this.preventDefault} onDragLeave={this.preventDefault}>
                {this.props.children}
            </div>
        );
    },
});

module.exports = Filedrop
