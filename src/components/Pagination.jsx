import React, { Component } from 'react';

export default class componentName extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
  render() {
    return (
<section className="pagination">

          <ul>
              <li onClick={()=>{this.props.prevPage()}}>Prev</li>
              <li onClick={()=>{this.props.nextPage()}}>Next</li></ul> 
              </section>
    );
  }
}