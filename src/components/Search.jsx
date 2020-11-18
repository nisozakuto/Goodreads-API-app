import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
        <section className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder={"term"}
            value={this.state.vinNumber}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>
      </section>
          );
  }
}
