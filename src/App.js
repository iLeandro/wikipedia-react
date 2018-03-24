
const apiUrl = query => 
`https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`

console.log('Before anything')
class Wiki extends React.Component {
    constructor(props){
        super(props);
      this.state = {
        query: '',
        wikiData: undefined,
        requestFailed: false,
        suggestions: [],
        title: null,
        description: [],
        links: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      console.log('Insiide Constructor')
    }
    
  // This method updates state's query value as user types in form
    handleChange(event){
        event.preventDefault();
        this.setState({
            query: event.target.value
        });
    }
  
  // This method called the triggers the API fetcher once user submits query
    handleSubmit(event){
        console.log('hi');
        let query =  this.state.query;
        query ? this.getData(query) : false;
        event.preventDefault();

    } 
  
    //Method calls API retrivies and stores data in state
    getData(){
      console.log('Before fetch')
        fetch(apiUrl(this.state.query))
        .then(console.log('fetch successful'))
        .then(response => {
            if(!response.ok){
                throw Error("msh sha3'ala!")
            }
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
    render(){
        //Returns "Request Failed" if api fails to connect 
        if(this.state.requestFailed) return <h1>Request Failed</h1>
        return (
          <div className="container">
          <form onSubmit={this.handleSubmit}>
                <input placeholder="Search Wikipedia"
                        value={this.state.query}
                        onChange={this.handleChange}
                        ></input>
                        <input type="submit" value="Submit" />
            </form>
            
            <ul>
                {
                (this.state.query == this.state.title) ? this.state.description.map((item, index) =>
                    {return (
                            <ListItem key={index}
                                      title={this.state.suggestions[index]}
                                      description={item}
                                      url={this.state.links[index]}/>)}
                ) : null
              }
            </ul>
            </div>
        )
    }
}

// A single listing view
function ListItem(props) {
  return(
    <a href={props.url} target="_blank">
      <li className="user-info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
      </li>
     </a>
  ) 
}

const element = ()=>{
  return (<div>
  <h1>Search</h1>
        <input type="text" 
                placeholder="wiki"
          onKeyPress="boo"></input>
    </div>)}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/500px-Wikipedia_svg_logo.svg.png" className="App-logo" alt="logo" />
          <h2>Welcome to Wiki Viewer</h2>
        </div>
        <Wiki></Wiki>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));





// import React, { Component } from 'react'
// import './App.css'
// import axios from "axios"

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       get: [],
//       keyword: ''
//     }

//     this.updateKeyWordValue = this.updateKeyWordValue.bind(this)

//     this.onSubmit = this.onSubmit.bind(this)
//     this.showResult = this.showResult.bind(this)
//   }


//   updateKeyWordValue(evt) {
//     this.setState({
//       keyword: evt.target.value
//     })
//   }


//   onSubmit() {
//     this.showResult()
//   }

  

//   showResult() {
//     axios.get("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+this.state.keyword+"&callback=?")
//     .then(function (response) {
//       console.log(response)
//       for(var i=0; i<response[1]; i++){
//         <li><a href={response[3][i]} target='_blank'> {response[1][i]} </a><p>{response[2][i]} </p></li>
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//       <div><i className="fab fa-wikipedia-w">
//       </i>Wikipedia <img alt="logo" src="https://zdnet3.cbsistatic.com/hub/i/2014/09/18/3a110cd4-3f31-11e4-b6a0-d4ae52e95e57/9642521e52dfc17497b92ad91a3b8070/wickedpedia.png" /> Viewer
//       </div>
  
//       <form className="searchForm">
//         <input onChange={this.updateKeyWordValue} placeholder="Text Here!"className="someText" />
//         <button type="button" className="submit" onClick={this.onSubmit} >GO!</button>
//       </form>
//       <div className="random"><a href="https://en.wikipedia.org/wiki/Special:Random" rel="noopener noreferrer" target="_blank"><button>Get A Random Article!</button>  </a>
//       </div>
//       <div>
//         <ul className="result">
  
//         </ul>
//       </div>
        
//     <footer>With Love By Leandro. Ideia from Amrit</footer>
//     </div>

//     );
//   }
// }

// export default App;
