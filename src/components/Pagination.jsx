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
              <li onClick={()=>{this.props.prevPage()}}> &lt;&lt;	 Prev</li>
              <li> - </li>
              <li onClick={()=>{this.props.nextPage()}}>Next  &gt;&gt;	</li></ul> 
              </section>
    );
  }
}