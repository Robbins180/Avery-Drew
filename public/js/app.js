class App extends React.Component {
  state = {
    name: "",
    image: "",
    characters: [],
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
    .post('/alice', this.state)
    .then(response =>
    this.setState({
      characters: response.data,
      name:'',
      image:'',
      })
    )
  }

  deleteAlice = event => {
  axios.delete('/alice/' + event.target.value).then(response => {
    this.setState({
      characters: response.data
      })
    })
  }


  componentDidMount = () => {
    axios.get("/alice").then((response) => {
      this.setState({
        characters: response.data,
      })
    })
  }

  updateAlice = event => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/alice/' + id, this.state).then(response => {
    this.setState({
      characters: response.data,
      name: '',
      image: ''
      })
    })
  }

    render = () => {
        return (
          <div>
            <h1>Create Character</h1>
            <div className="add">
            <details>
            <summary>Add An Character</summary>
              <form
                onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
                />
                <br />
                <label htmlFor="image">Image</label>
                <input
                type="text"
                id="image"
                onChange={this.handleChange}
                value={this.state.image}
                />
                <br />
              <input
              type="submit"
              value="Add Character" />
              </form>
              </details>
              </div>
              <h2>List of Characters</h2>
                <ul>
                {this.state.characters.map((alice) => {
                    return (
                      <li key={alice._id}>
                      {alice.name} <br />
                      <img src={alice.image} alt={alice.name} />
                      <div className="edit">
                      <details>
                      <summary>Edit this character</summary>
                      <form id={alice._id} onSubmit={this.updateAlice}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" placeholder={alice.name} id="name" onChange={this.handleChange} />
                        <br />
                        <label htmlFor="image">Image</label>
                        <br />
                        <input type="text" id="image"  onChange={this.handleChange} />
                        <br />
                        <input type="submit" id="updateBtn" value="Update Character" />
                        </form>
                        </details>
                        </div>
                      <button value={alice._id} id="deleteBtn" onClick={this.deleteAlice}>
                        DELETE
                      </button>
                      </li>
                    )
                  })}
                </ul>
          </div>
        )
      }
    }

ReactDOM.render(<App></App>, document.querySelector("main"));
