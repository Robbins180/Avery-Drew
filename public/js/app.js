class App extends React.Component {
  state = {
    name: "",
    image: "",
    characters: [],
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
    .post('/alice', this.state)
    .then(response =>
    this.setState({ char: response.data, name: '', image: '' })
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
        <h1>Alice In Wonderland</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" onChange={this.handleChange} />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input type="text" id="image" onChange={this.handleChange} />
          <br />
          <input type="submit" value="Add Character" />
        </form>
        <h2>Characters</h2>
          <ul>
            {this.state.characters.map((char) => {
              return (
                <li key={char._id}>{char.name} <br />
                {char.name} <br />
                <img src={char.image} alt={char.name} />
                <button value={char._id}onClick={char.deleteAlice}>
                  DELETE
                </button>
                </li>
              )
            })}
          </ul>
      </div>
    );
  };
}

ReactDOM.render(<App></App>, document.querySelector("main"));
