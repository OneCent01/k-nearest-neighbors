# React K-Nearest-Neighbor Component

React component building a k-Nearest Neighbor graph, allowing for input data, and size (height + width) to be specified. You can then interactively add additional data which has yet to be classified, and see the algorithm in action! 

## Getting Started

Importing a data visualization in React has never been so easy! Just install the module: 
```
npm install react-knn-component
```
Then, proceed to import and use the component, remembering to pass in the necessary props:
```
import {KNearestNeighbors} from 'KNearestNeighbors';
//example data: 
const data = [{x: 32, y: 40, identity: 1},
              {x: 5, y: 27, identity: 0},
              {x: 17, y: 9, identity: 0}]
...
render() {
  return (
    <div>
      <KNearestNeighbors h='300px' w='300px' training={data}/>
    </div>
  )
}
```
result willl be a beautifully unopinionated graph:
(http://imgur.com/a/ZUR6v)


## Built With

* [D3](https://d3js.org/) - Data driven documents: visualization tool
* [React](https://facebook.github.io/react/) - Frontend framework
* [Babel](https://babeljs.io/) - Transpiles code to run in the browser

## Author

* **Jacob Penney** - *Initial work* - [OneCent01](https://github.com/OneCent01 - jmpenney22@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details