class App extends React.Component{
  state = {
    name:"",
    img:"",
  }

  render = () => {
    return (
      <div>
        <h1>Alice In Wonderland</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
