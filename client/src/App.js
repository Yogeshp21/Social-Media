import  LoadingBar  from 'react-top-loading-bar'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';

function App() {
  const isLoading = useSelector(state => state.appConfigReducer.isLoading)
  const loadingRef = useRef(null)
  useEffect(()=>{
    if(isLoading){
      loadingRef.current?.continuousStart();
    }
    else{
      loadingRef.current?.complete()
    }
  },[isLoading])

  return (
    <div className='App'>
      <LoadingBar color='#fff' ref={loadingRef}/>
    </div>
  );
}

export default App;
