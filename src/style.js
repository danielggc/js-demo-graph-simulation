const cyStyle2 = [



  {

    selector: 'node',
    style: {
      'background-color': 'white',
      'border-color': 'black',
      'label': 'data(id)',
      'width': 120,
      'height': 120,
      'min-zoomed-font-size': 16,
      'color': '#fff',
      'font-size': 16,
      'z-index': 1
    }
  },

  {
      selector: 'node[type="Residential"]',
      style: {
        'background-image': 'url(/images/Residential.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="Commercial"]',
      style: {
        'background-image': 'url(/images/Commercial.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="TransformerGeneration"]',
      style: {
        'background-image': 'url(/images/TransformerGeneration.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="Transformer"]',
      style: {
        'background-image': 'url(/images/Transformer.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="SynchronousGenerator"]',
      style: {
        'background-image': 'url(/images/SynchronousGenerator.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="InverterGenerator"]',
      style: {
        'background-image': 'url(/images/InverterGenerator.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="CustomerIndustrial"]',
      style: {
        'background-image': 'url(/images/CustomerIndustrial.png)',
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
    {
      selector: 'node[type="Unknown"]',
      style: {
        'background-color': 'white',
        'border-color': 'black',
        'label': 'data(id)',
        'width': 150,
        'height': 150,
        'min-zoomed-font-size': 16,
        'color': '#fff',
        'font-size': 16,
        'z-index': 1
      }
    },
  {
    selector: 'node:selected, node.start, node.end',
    style: {
      'height': 200,
      'width': 200,
      'min-zoomed-font-size': 0,
      'font-size': 18,
      'border-color': '#000',
      'border-width': 10,
      'text-outline-color': '#000',
      'text-outline-width': 10,
      'z-index': 9999
    }
  },
  {
    selector: 'node.start, node.end',
    style: {
      'background-color': '#FC4C4C',
      'color': '#FC4C4C'
    }
  },

  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#FF851B',
      'target-arrow-shape': 'triangle',
      'label': 'data(label)',
      'text-background-color': 'white',
      'text-background-opacity': 1,
      'text-background-padding': '3px'
    }
  }
];



 export default cyStyle2;
