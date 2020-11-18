import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
        <header>
        <ul>
          <li
            onClick={() => {
              this.props.homepage();
            }}
          >
            goodreads API
          </li>
        </ul>
      </header>
  
    );
  }
}
