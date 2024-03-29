import React,{component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends component {
  constructor(props){
    super(props)
    this.state={
      books:[]
    }
  }

  componentDidMount(){

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book')
    .then(res =>{
      this.setState({books:res.data})
      console.log(this.state.books)
    }).catch((error)=>{
      if(error.response.status === 401){
        this.props.history.push('/login');
      }

    })


  }
  logout =() =>{
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render(){
    return(
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>List Of Books</h3>
            {localStorage.getItem('jwtToken') && <button class="btb btn-primary" onClick={this.logout}>Logout</button>}
          </div>
          <div class="panel-body">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) =>{          //getting error on this line
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                })}
                
              </tbody>
            </table>
          </div>

        </div>

      </div>
    )
}
}

export default App;