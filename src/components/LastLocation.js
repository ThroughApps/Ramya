import React from 'react';
import { withLastLocation } from 'react-router-last-location';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';

const LastLocation1 = () => {
  const lastLocation = useLastLocation();
console.log("lastLocation :",lastLocation);

  return (
    <div>
      <h2>LAST LOCATION Logger!</h2>
      <pre>
        {JSON.stringify(lastLocation)}
      </pre>
    </div>
  );
};

//let history = useHistory();
const LastLocation = ({ lastLocation }) => (
  
//export const LastLocation = (lastLocation) => {
 //console.log("lastLocation on LOGGER :",lastLocation)
  <div>
    <h2>Logger!</h2>
    <pre>
      {JSON.stringify(lastLocation)}
    </pre>
  </div>
 ) 
 
export default withLastLocation(LastLocation);




export  const demo = function (){
    
    const goToPreviousPath = () => {
     //   history.goBack()
       // console.log("  history.goBack() :",  history.goBack());
    }


   /* return 
      <div>
        <Button
          onClick={goToPreviousPath}
        >
          Back
        </Button>
      </div>
      */
    
}



/*export default withRouter(({ history }) => {
  console.log("history.goBack() :",history.goBack())

  /*return (
    <div>
      <button onClick={() => history.goBack()}>BACK</button>
    </div>
  )
  *
});
*/