var React = require('react');

var utils = require('../utils.js');


var Operation = React.createClass({

  propTypes: {
    cmds: React.PropTypes.array.isRequired,
    operations: React.PropTypes.array.isRequired,
    operation: React.PropTypes.object.isRequired,
    pushOperationIfLast: React.PropTypes.func.isRequired,
    canRemoveOperation: React.PropTypes.func.isRequired,
    removeOperation: React.PropTypes.func.isRequired,
    position: React.PropTypes.number.isRequired,
    onCmdChange: React.PropTypes.func.isRequired,
    onArgsChange: React.PropTypes.func.isRequired
  },

  componentDidUpdate: function() {

  },

  render: function() {
    // construct an array of command options to go in the command <select>
    var options = this.props.cmds.map(function(cmd, index){
      return (
        <option key={cmd.name} value={cmd.name}>
          {cmd.name}
        </option>
      );
    }.bind(this));

    // add an operation remove button if operations can be removed in the
    // current state and this operation is not the last, placeholder operation
    var removeButton;
    if (this.props.canRemoveOperation() &&
        this.props.position != this.props.operations.length - 1) {
      removeButton = (
        <button className="remove-operation"
                onClick={this.props.removeOperation.bind(null, this.props.position)}>
          ✕
        </button>
      );
    }
    var error;
    // only display error if there is an error message and args isn't empty
    // because some commands will output to stderr with "usage" info if you
    // don't provide args
    if (this.props.operation.error.length && this.props.operation.args.length) {
      error = (
        <div className="error" data-tooltip={this.props.operation.error}>
          !
        </div>
      );
    }

    return (
      <div className="operation">
        <select name="cmd" value={this.props.operation.cmd}
                onChange={this.props.onCmdChange.bind(null, this.props.position)}>
          {options}
        </select>
        <div className="dropdown-arrow"
             onClick={utils.dropDownCommandSelect.bind(null, this.props.position)}>
          ▾
        </div>
        <div className="args">
          <input type="text" name="args" value={this.props.operation.args}
                 onChange={this.props.onArgsChange.bind(null, this.props.position)}
                 onFocus={this.props.pushOperationIfLast.bind(null, this.props.position)} />
        {error}
        </div>
        {removeButton}
      </div>
    );
  }

});


module.exports = Operation;
