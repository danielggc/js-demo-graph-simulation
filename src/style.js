const cyStyle2 = [
  {
    selector: 'node',
    style: {
      'background-color': 'white',
      'border-color': 'black',
      'label': 'data(id)',
      'width': 20,
      'height': 20,
      'min-zoomed-font-size': 16,
      'color': '#fff',
      'font-size': 16,
      'z-index': 1
    }
  },
  {
    selector: 'node:selected, node.start, node.end',
    style: {
      'height': 20,
      'width': 20,
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
