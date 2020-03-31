// TodoBanner component
class TodoBanner extends React.Component {
    // render this component
    render (){
        return (
            <h1>Todo Example with React</h1>
        )
    }
}

// TodoList component
class TodoList extends React.Component {
    // render this component
    render () {
      return (
        <div>
            <ul>
        {this.props.items.map((item, index) => 
            <li key = {index}>
                {this.props.items[index]} 
                <img src="delete.jpg" onClick= {() => this.props.removeItem(index)}></img>
            </li>
        )}
        </ul>
      </div>
      );
    }
}


// TodoForm component
class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // add a new item -> call parent
    handleSubmit (e) {
        // prevent normal submit event
        e.preventDefault();
        // call parent to add a new item
        this.props.onFormSubmit(this.refs.item.value);
        // remove new typed item from text input
        this.refs.item.value = "";
        // focus text input
        this.refs.item.focus();
    }

    // render component
    render (){
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref = "item" type= "text"></input>
                <button>Add</button>
            </form>
        );
    }
}

// App component
class App extends React.Component {
    // init state
    constructor(props) {
      super(props);
      this.state = {items: []};
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
    }

    // add a new item
    addItem (newItem) {
        // add new item to items array
        this.setState(function(state) {
            let newItems = state.items;
            newItems.push(newItem); 
            return {items: newItems};
        });    
    }

    // remove item
    removeItem (index){
        // remove from items array
        this.setState(function(state) {
            let newItems = state.items;
            newItems.splice(index, 1);
            return {items: newItems};
        });
    }

    // render component
    render () {
        return (
            <div>
                <TodoBanner/>
                <TodoForm onFormSubmit={this.addItem} />
                <TodoList items={this.state.items} removeItem={this.removeItem} />
            </div>
        )
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);