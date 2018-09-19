import PropTypes from 'prop-types'
import React from 'react'

import '../stylesheets/simple_docs.scss'

export default class FileUploadForm extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // Only need to set initial state here for the local state components
      name: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.updateFolderTree = this.updateFolderTree.bind(this)
    this.baseState = this.state
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    console.log('handleSubmit:', this.state)
    event.preventDefault()
    this.props.actions.uploadFile(this.state)
    this.resetForm()
  }

  resetForm() {
    this.setState(this.baseState)
  }

  updateFolderTree() {
    this.props.actions.fetchFolderContents()
  }

  render() {
    // This is how you set an inline style using jsx
    const clearStyle = {
      clear: 'both'
    }

    return (
      <div id="app">
        <hr />

        {/* The following form input fields are updated using local state via React controlled component */}
        <div className="container">
          <div id="simple-docs">
            <div id="simple-docs-form">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">
                  File name:
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <br />
                <label htmlFor="file">
                  Upload file:
                </label>
                <input
                  name="file"
                  id="file"
                  type="file"
                  multiple
                />
                <br />
                <input type="submit" value="Upload file" />
                <input onClick={this.resetForm} type="button" value="Reset" />
              </form>
            </div>

            <div style={clearStyle} />
          </div>

          <hr />
        </div>
      </div>
    )
  }
}
