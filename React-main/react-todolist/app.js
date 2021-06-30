// Composant : Tâche
class Tache extends React.Component {
   

  render() {
      let class_name = 'task'
      class_name += this.props.done == 0 ? ' task-success' : ' task-info';

      return (
          <div className={class_name} onClick={this.props.markdone}>
              <span>{this.props.value}</span>
              
              <i className="close" onClick={this.props.deleteItem}>&times;</i>
          </div>
      )
  }
}

// Application
class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
       tacheList: []
    };
  }
  componentDidMount() {
    this.chargementDonnees();
  }
  chargementDonnees(){

    var dataList = null;
    
    // affichage de données par Ajax

    $.getJSON( "api/showtasks.php", 
    function( data ) {
      this.setState({ tacheList: data});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown) 
    {
       console.log(errorThrown);
   })
    ;
 
  }

  addTask(e) {

    $.ajax({
      url:"api/addtask.php",
      method:"POST",
      data:{
        tache : addInput.value ,
      },
      success:function(data) {
        this.chargementDonnees()
        console.log(data)
    }.bind(this)
    })
    
   e.preventDefault()
 }
deleteItem = (id)=>{
  console.log(id)

          $.ajax({
              url : 'api/deleteItem.php',
              type : 'post',
              data : {
              sid : id
              },
              datatype: JSON,
              success: (data)=>{
                let tacheList = this.state.tacheList;
                let i = tacheList.findIndex(item => item.id === id)
                tacheList.splice(i,1)
                this.setState({tacheList:tacheList})
              }

          })
}
  

Markdone = (id,status)=>{
  console.log(status,id)

  if (status!=0) {
    $.ajax({
      url : 'api/edit.php',
      type : 'post',
      data : {
      id : id,
      status : 0    
    },
      datatype: JSON,
      success: (data, textStatus, xhr)=>{

        const update_tachelist = [];
        this.state.tacheList.forEach(element=>{
          if(element.id != id){
            update_tachelist.push(element)
          }
          else{
            update_tachelist.push({
              ...element,
              done:0
            })
          }
        })

        this.setState({tacheList : update_tachelist})

        console.log(data)
        // this.chargementDonnees();
        console.log(xhr.status)
      }
  
  })
  } else {
    console.log("no")
    $.ajax({
      url : 'api/edit.php',
      type : 'post',
      data : {
      id : id,
      status : 1    
    },
      datatype: JSON,
      success: (data, textStatus, xhr)=>{
        const update_tachelist = [];
        this.state.tacheList.forEach(element=>{
          if(element.id != id){
            update_tachelist.push(element)
          }
          else{
            update_tachelist.push({
              ...element,
              done:1
            })
          }
        })

        this.setState({tacheList : update_tachelist})

        //this.chargementDonnees();
        console.log(data)
        console.log({update_tachelist})
        console.log(xhr.status)
      }
  
  })
  }


}



  render() {
   
    let tachesArrayMap = this.state.tacheList.map((tache, i) => {
      return (
        <Tache 
          key={i}
          value={tache.tache}
          done={tache.done}
          deleteItem={()=>this.deleteItem(tache.id)}
          markdone={()=>this.Markdone(tache.id,tache.done)}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>My tasks</h1>
            <form
              id="form-add"
              className="form-horizontal" onSubmit={this.addTask.bind(this)}>
              <div className="input-group">
                <input type="text" id="addInput" className="form-control"  placeholder="Add your tasks here..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button>
                </div>
              </div>
            </form>

            {tachesArrayMap}
                        
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));