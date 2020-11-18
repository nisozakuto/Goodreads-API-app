import React, { Component } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import Header from "./components/Header";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      term: "",
      results: null,
      selectedBookInfo: null,
      pageNumber: 1,
      maxPageNumber: 999999999999,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
  }

  getDetails() {
    console.log("get details");
    fetch(
      `https://goodreads-server-express--dotdash.repl.co/search/${this.state.term}?page=${this.state.pageNumber}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          results: res.list,
          maxPageNumber: Math.floor(res.total / res.list.length),
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

  homepage = () => {
    this.setState({
      selectedBookInfo: null,
      results: null,
    });
  };

  nextPage = () => {
    if (this.state.pageNumber <= this.state.maxPageNumber) {
      this.setState({
        pageNumber: this.state.pageNumber + 1,
      });
    }
    this.getDetails();
  };

  prevPage = () => {
    if (this.state.pageNumber === 1) {
      alert("You are at page number 1");
    } else
      this.setState({
        pageNumber: this.state.pageNumber - 1,
      });
    this.getDetails();
  };

  render() {
    return (
      <>
        <Header homepage={this.homepage} />
        <main>
          <section className="search">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder={"term"}
                onChange={this.handleChange}
              />
              <input type="submit" value="Search" />
            </form>
          </section>
          <section className="results">
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
          <Pagination nextPage={this.nextPage} prevPage={this.prevPage} />
        </main>
      </>
    );
  }
}
