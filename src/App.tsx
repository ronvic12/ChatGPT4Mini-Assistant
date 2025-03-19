
import * as React from 'react'
import ChatComponent from './components/ChatComponent';


const App:React.FunctionComponent = () => {
  return (

    <div className="max-w-5xl mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          <ChatComponent/>
      </div>
    </div>

  );

} ;

export default App;