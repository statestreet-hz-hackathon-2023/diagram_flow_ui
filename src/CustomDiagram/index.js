import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from 'react-flow-diagram';
import model from './model-example';
import { config, customEntities } from './config-example';
import axios from 'axios'

const REQUEST_URL = 'http://localhost:8080/api/default'
const POSITION_URL = 'http://localhost:8080/api/position'
// const [groups, setGroups] = useState([]);



class CustomDiagram extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      modelApi:[],
      userDiagram: [{ "id": "test", "type": "Task", "width": 110, "height": 110, "x": 110, "y": 110, "name": "test", "linksTo": [{}] }]
    }
  }

  componentWillMount() {
     axios.get(REQUEST_URL).then((response) => {
      this.setState({ modelApi: response.data }, () => {
        console.log('to Json: ' + JSON.stringify(this.state.modelApi))
      })
     })
     
    // diagramStore.dispatch(setConfig(config));
    // diagramStore.dispatch(setEntities(this.state.modelApi));

    // diagramOn('anyChange', entityState =>
    //   // You can get the model back
    //   // after modifying the UI representation
    //   console.info(entityState)
    // );
  }
  render() {
    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(this.state.modelApi));

    diagramOn('anyChange', entityState =>
      // You can get the model back
      // after modifying the UI representation
      // console.info(entityState)
      fetch(POSITION_URL, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entityState)
      })
    );
    return <Diagram customEntities={customEntities} />;
  }
}

export default CustomDiagram;
