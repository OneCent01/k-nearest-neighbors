import React from 'react';

const SubmitData = (props) => {
  return ( <div>
    <div id="submitData">
    <form onSubmit={(event) => props.submit(event)}>
      <b>Add data:</b> <br/>
      x:<input id="x" type="text" placeholder="CA15-3 in U/mL"/><br/>
      y:<input id="y" type="text" placeholder="CA27-29 in U/mL"/>
      <button>Submit</button>
    </form>
  </div>
  </div>)
};

export default SubmitData;