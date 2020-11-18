// see https://repl.it/@Dotdash/Goodreads-Server-Express for implementation details
// const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${term}`;

import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      term: "",
      results: null,
      selectedBookInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
  }

  getDetails() {
    fetch(
      `https://goodreads-server-express--dotdash.repl.co/search/${this.state.term}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          results: res.list,
        });
      });
  }

  handleSubmit(event) {
    this.getDetails();
    event.preventDefault();
  }

  selectedBook(title) {
    fetch(`https://goodreads-server-express--dotdash.repl.co/search/${title}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          selectedBookInfo: res.list,
        });
      });
  }

  homepage() {
    this.setState({
      selectedBookInfo: null,
      results: null,
    });
  }

  render() {
    return (
      <>
        <header>
          <ul>
            <li
              onClick={() => {
                this.homepage();
              }}
            >
              goodreads API
            </li>
          </ul>
        </header>
        <main>
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
          <section>
            <article className="books">
              {this.state.selectedBookInfo ? (
                <div className="book">
                  <h1>{this.state.selectedBookInfo[0].authorName}</h1>
                  <h3>{this.state.selectedBookInfo[0].title}</h3>
                  <img
                    src={this.state.selectedBookInfo[0].imageUrl}
                    alt={this.state.selectedBookInfo[0].title}
                    width="250px"
                  ></img>
                </div>
              ) : (
                <>
                  {this.state.results ? (
                    this.state.results.map((e) => (
                      <div
                        className="book"
                        onClick={() => {
                          this.selectedBook(e.title);
                        }}
                      >
                        <h1>{e.authorName}</h1>
                        <h3>{e.title}</h3>
                        <img src={e.imageUrl} alt={e.title} width="250px"></img>
                      </div>
                    ))
                  ) : (
                    <p>Type your term and search!</p>
                  )}
                </>
              )}
            </article>
          </section>
        </main>
      </>
    );
  }
}
