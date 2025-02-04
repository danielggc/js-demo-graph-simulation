import React, { Component } from 'react';
import Cytoscape from 'cytoscape';
import cyStyle2 from './style.js'

function updateLabel( cy ) {
  cy.nodes().forEach(node => {
    const id = node.data("id");
    const reqReactive = node.data("requiered_reactive_power");
    const reqActive = node.data("requiered_active_power");
  
    node.data("label", `${id}\nRequiered Power:(${reqReactive},${reqActive}) kW`);
  });
  
}
function panelStop(evt,cy,infoPanel){
  if (evt.target === cy) {
    infoPanel.style.display = "none";
  }
}

function panelStart(event, infoPanel){
  const node = event.target;
  const label = node.data("label");
  const requiered_reactive_power = node.data("requiered_reactive_power");
  const requiered_active_power = node.data("requiered_active_power")
  const pos = node.renderedPosition();
  infoPanel.style.left = `${pos.x + 20}px`;
  infoPanel.style.top = `${pos.y + 20}px`;

  infoPanel.innerHTML = `<strong>${label}</strong><br>Power:(${requiered_reactive_power},${requiered_active_power})`;
  infoPanel.style.display = "block";
}
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      cy: null, 
      isSimulating: false,
    };
  }


  componentDidMount() {
    var styleP = fetch('style.cycss').then(e => e.text());
    var elementsp = fetch('http://localhost:3001/graph-data').then(res => res.json() );

    this.infoPanel = document.createElement("div");
    this.infoPanel.style.position = "absolute";
    this.infoPanel.style.background = "rgba(0, 0, 0, 0.8)";
    this.infoPanel.style.color = "white";
    this.infoPanel.style.padding = "10px";
    this.infoPanel.style.borderRadius = "5px";
    this.infoPanel.style.display = "none"; 
    this.infoPanel.style.zIndex = "1000";
    document.body.appendChild(this.infoPanel);

    Promise.all(([styleP,elementsp])).then((data) => {
          const cyInstance = Cytoscape({
            container: document.getElementById('cy'),
            elements: [],
            style: cyStyle2,
            layout: { name: 'grid', fit: true },
          });
          cyInstance.on("tap", "node", event => panelStart(event,this.infoPanel) )
          this.setState({ cy: cyInstance });
          cyInstance.on("tap", (evt) => panelStop(evt,cyInstance,this.infoPanel) )
        }
      )
   
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.cy !== prevState.cy) {
      const interval = setInterval(() => {
        fetch('http://localhost:3001/graph-data')
          .then(res => res.json())
          .then(new_entity => {
            const { cy } = this.state;
            if (cy) {
              new_entity.forEach(entity => {
                if(cy.getElementById(entity.data.id).empty() ){
                  console.info(`here the data new ${entity.data.id} ${cy.getElementById(entity.id)}`)
                  cy.add(entity);
                }
                else{
                  console.info(`here the data update ${entity.data.id} ${entity.data.requiered_active_power}`)
                  cy.getElementById(entity.data.id)
                  .data('requiered_reactive_power',entity.data.requiered_reactive_power)
                  .data('requiered_active_power',entity.data.requiered_active_power)
                }
              });
            } else {
              console.warn('No se pueden agregar el borde');
            }
          });
      }, 1000);

      return () => clearInterval(interval); 
    }
  }

  startSimulation = () => {
    this.setState({ isSimulating: true });
    console.log(' iniciada');
  };

  stopSimulation = () => {
    this.setState({ isSimulating: false });
    console.log(' detenida');
  };

  render() {
    const { isSimulating } = this.state;

    return(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>simulation graph</h1>

        <div style={{ marginBottom: '20px' }}>
          {!isSimulating ? (
            <button onClick={this.startSimulation}>Start Simulation</button>
          ) : (
            <button onClick={this.stopSimulation}>Stop Simulation</button>
          )}
        </div>

        <div
          id="cy"
          style={{
            width: '80vw', 
            height: '70vh', 
            border: '1px solid #ccc',
            marginTop: '20px',
            display: isSimulating ? 'block' : 'none',
          }}
        />
      </div>
    );
  }
}

export default App;
