import React, { Component } from 'react';
import Cytoscape from 'cytoscape';

import cyStyle2 from './style.js'
// 500b012c-8310-416c-9f2b-d9cbcd0b37ee
//1606ceb1-8cb5-40c1-aaa5-954ea33d6864
//c5b8c0d6-de8e-4bc9-a7b9-9116a35b7013
const simulationId = "c45beb37-d0f5-4093-a01c-245a6c74e29b";
const entityId = "85e11015-819b-4e4a-8abc-90dd47b69ed4";

const getEntityType = (entityId) => {
    switch (true) {
        case entityId.includes("CUST_RES"):
            return "Residential";
        case entityId.includes("CUST_COM"):
            return "Commercial";
        case entityId.includes("TRAFO_GEN"):
            return "TransformerGeneration";
        case entityId.includes("TRAFO_"):
            return "Transformer";
        case entityId.includes("SYNC_GEN"):
            return "SynchronousGenerator";
        case entityId.includes("INV_GEN"):
            return "InverterGenerator";
        case entityId.includes("CUST_IND"):
          return "CustomerIndustrial";
        default:
            return "Unknown";
    }
};

async function fetchElements() {
        const response = await fetch(`http://ginom-engine-dev-alb-1378689225.us-east-1.elb.amazonaws.com/simulation/${simulationId}/${entityId}/entitystates`);
        const data = await response.json();
        console.log(data[0]);
        const filterData =  data.filter( entity =>
                  entity.stateChartState === "ON_EXIT" &&
                   ( entity.stateChartName.includes("SimulateAvailablePower") ||
                    entity.stateChartName.includes( "WaitForAvailablePowerFromSource")
                   )
                 );



        const entities = filterData.filter( entity => !entity.entityId.includes("LINE") )
        .map( entity => {

            const nodeEntity = {
              id: entity.entityId,
              label: entity.entityId,
              entityData: entity,
              type: getEntityType(entity.entityId)
            }
           return  {
           data:nodeEntity
           }
          }
        )
        console.log( entities[0] )


       const connections = filterData.filter( entity => entity.entityId.includes("LINE") )
         .map( entity => {
                    const nodeEntity = {
                        data:{
                          id: entity.entityId,
                          label: entity.entityId,
                          source: entity.state.power.loadEntityIds[0],
                          target: entity.state.power.sourceEntityIds[0],
                          entityData: entity
                        }
                    }

                    const sourceExists = filterData.some(e => e.entityId === nodeEntity.data.source);
                    const targetExists = filterData.some(e => e.entityId === nodeEntity.data.target);


                    if (sourceExists && targetExists) {
                      return nodeEntity;
                    }
                    return {}

                  }
         )

 const connectionsGen = filterData.filter( entity => (entity.entityId.includes("INV_GEN") ||  entity.entityId.includes("SYNC_GEN")  ) )
         .map( entity => {
                    console.log(entity)
                    const nodeEntity = {
                        data:{
                          id: entity.entityId+"C",
                          label: entity.entityId+"C",
                          source: entity.entityId ,
                          target: entity.state.power.sourceEntityIds[0] ,
                          entityData: entity
                        }
                    }

                    const sourceExists = filterData.some(e => e.entityId === nodeEntity.data.source);
                    const targetExists = filterData.some(e => e.entityId === nodeEntity.data.target);


                    if (sourceExists && targetExists) {
                      return nodeEntity;
                    }
                    return {}

                  }
         )
        console.log( connectionsGen[0] )

      return (entities.concat( connections )).concat(connectionsGen) ;
    }



function panelStop(evt,cy,infoPanel){
  if (evt.target === cy) {
    infoPanel.style.display = "none";
  }
}

function panelStart(event, infoPanel){
  const node = event.target;
  const label = node.data("label");
  console.log(node.data("entityData"))
  const requiered_reactive_power = node.data("entityData").state.power.requiredPower.reactivePower.megawatts;
  const requiered_active_power = node.data("entityData").state.power.requiredPower.activePower.megawatts
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

    this.infoPanel = document.createElement("div");
    this.infoPanel.style.position = "absolute";
    this.infoPanel.style.background = "rgba(0, 0, 0, 0.8)";
    this.infoPanel.style.color = "white";
    this.infoPanel.style.padding = "10px";
    this.infoPanel.style.borderRadius = "5px";
    this.infoPanel.style.display = "none"; 
    this.infoPanel.style.zIndex = "1000";
    document.body.appendChild(this.infoPanel);
    const elementsp =  fetchElements()

    elementsp.then( data => {
          const cyInstance = Cytoscape({
            container: document.getElementById('cy'),
            elements: data,
            style: cyStyle2,

          });

          cyInstance.on("tap", "node", event => panelStart(event,this.infoPanel) )
          this.setState({ cy: cyInstance });
          cyInstance.on("tap", (evt) => panelStop(evt,cyInstance,this.infoPanel) )

        }
      )
      .then(data => {
          return new Promise(resolve => setTimeout(resolve, 1000));
        }).then( e=> {
        this.state.cy.layout({
            name: 'cose',
            fit: true,
            padding: 50,
         }).run();
      })

   
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
            width: '70vw',
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
