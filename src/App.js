// import React from 'react'
// import './App.css'

// const apiUrl = query => `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`

// class Wiki extends React.Component {
//   constructor(props){
//   super(props)
//     this.state = {
//       query: '',
//       wikiData: undefined,
//       requestFailed: false,
//       suggestions: [],
//       title: null,
//       description: [],
//       links: []
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//   }
    
//   // This method updates state's query value as user types in form
//   handleChange(event){
//     event.preventDefault()
//     this.setState({
//       query: event.target.value
//     })
//   }
  
//   // This method called the triggers the API fetcher once user submits query
//   handleSubmit(event){
//     event.preventDefault()
//     let query =  this.state.query
//     query ? this.getData(query) : false;

//   } 
  
//   //Method calls API retrivies and stores data in state
//   getData(){
//     fetch(apiUrl(this.state.query))
//     .then(console.log('fetch successful'))
//       .then(response => {
//         if(!response.ok){
//           throw Error("msh sha3'ala!")
//         }
//         return response
//       })
//       .then(data => data.json())
//       .then(data => {
//         this.setState({
//           suggestions: data[1],
//           title: data[0],
//           description: data[2],
//           links: data[3]
//         })
//           console.log(data)
//         }, ()=>{
//           this.setState({
//             requestFailed: true
//           })
//         })
//     }
//     render(){
//     //Returns "Request Failed" if api fails to connect 
//       if(this.state.requestFailed) return <h1>Request Failed</h1>
//         return (
//           <div className="container">
//           <form onSubmit={this.handleSubmit}>
//             <input 
//               placeholder="Search Wikipedia"
//               value={this.state.query}
//               onChange={this.handleChange}
//             />

//             <input type="submit" value="Submit" />
//           </form>
            
//           <ul>
//             { (this.state.query === this.state.title) ? this.state.description.map((item, index) =>
//               {return (
//                 <ListItem 
//                   key={index}
//                   title={this.state.suggestions[index]}
//                   description={item}
//                   url={this.state.links[index]}/>)}
//               ) : null
//             }
//           </ul>
//           </div>
//         )
//     }
// }

// // A single listing view
// function ListItem(props) {
//   return(
//     <a href={props.url} target="_blank">
//       <li className="user-info">
//           <h2>{props.title}</h2>
//           <p>{props.description}</p>
//       </li>
//     </a>
//   ) 
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/500px-Wikipedia_svg_logo.svg.png" className="App-logo" alt="logo" />
//           <h2>Welcome to Wiki Viewers</h2>
//         </div>

//         <Wiki />
//       </div>
//     );
//   }
// }

// export default App




import React, { Component } from 'react'
import './App.css'
//import axios from "axios"
import { Panel } from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();
    this.state = {
      keyword: [],
      suggestions: [],
      title: [],
      description: [],
      links: [],
      requestFailed: false
    }

    this.updateKeyWordValue = this.updateKeyWordValue.bind(this)

    this.onSubmit = this.onSubmit.bind(this)
    this.showResult = this.showResult.bind(this)
  }


  updateKeyWordValue(evt) {
    this.setState({
      keyword: evt.target.value
    })
  }


  onSubmit() {
    this.showResult()
  }

  

  showResult() {

  fetch("https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + this.state.keyword + "")
    .then(console.log('fetch successful'))
    .then(response => {
      return response
    })
    .then(data => data.json())
    .then(data => {
    this.setState({
      suggestions: data[1],
      title: data[0],
      description: data[2],
      links: data[3]
    })
    console.log(data)
    }, ()=>{
      this.setState({
        requestFailed: true
      })
    })
  }


  //   fetch("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Portugal")
  //     //.then(console.log('fetch successful'))
  //     .then(results => {
  //       return results.json()
  //     })
  //     .then(data => {
  //       let keywords = data.results.map((item, index) => {
  //         return (
  //           <div key={index.results}>
  //             <ul>
  //               <li>
  //                 {index.title}
  //               </li>
  //             </ul>
  //           </div>
  //         )
  //       })
  //       this.setState({keyword: keywords})
  //       console.log("state ",this.state.keyword)
  //     })
  // }

  render() {
    return (
      <div className="container">
        <div>
          <i className="fab fa-wikipedia-w"></i>
          Wikipedia&nbsp;
          <img 
          alt="logo" 
          src="https://zdnet3.cbsistatic.com/hub/i/2014/09/18/3a110cd4-3f31-11e4-b6a0-d4ae52e95e57/9642521e52dfc17497b92ad91a3b8070/wickedpedia.png" 
          /> Viewer
      </div>
  
      <form className="searchForm">
        <input onChange={this.updateKeyWordValue} placeholder="Text Here!" className="form-control" /> <br/>
        <button type="button" className="btn btn-primary" onClick={this.onSubmit} >Search!</button>
      </form>

      <div className="random">
        <a href="https://en.wikipedia.org/wiki/Special:Random" rel="noopener noreferrer" target="_blank">
          <button type="button" className="btn btn-success">Get A Random Article!</button> <br/>
        </a>
      </div>

      <div className="divResult">
        <ul>
          {
            (this.state.title === this.state.title) ? this.state.description.map((item, index) =>
              {return (
                <ListItem 
                  key={index}
                  title={this.state.suggestions[index]}
                  description={item}
                  url={this.state.links[index]}
                />
              )}
            ) : null
          }
        </ul>
      </div>
    <footer>With Love By iLeandro. Ideia from FreeCodeCamp</footer>
    </div>

    );
  }
}


// A single listing view
function ListItem(props) {
  return(
     <div className="container">
     <a href={props.url} target="_blank">
      <Panel>
        <Panel.Heading bsStyle="info">
          <Panel.Title componentClass="h3"> {props.title} </Panel.Title>
        </Panel.Heading>
        
        <Panel.Body> {props.description} </Panel.Body>
      </Panel>
      </a>
    </div>
  ) 
}

export default App;


     {/* <div className="container">
      <div className="panel panel-primary">
        <a href={props.url} target="_blank">
          <div className="panel-heading">
            <h2>{props.title}</h2>
          </div>
          <div className="panel-body">
            <p>{props.description}</p>
          </div>
        </a>
      </div>
     </div> */}