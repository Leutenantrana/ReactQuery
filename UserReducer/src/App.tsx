import {useCounterValue, useCounterDispatch} from './CounterContext'


const Display =()=>{
  const counter = useCounterValue()

  return(
    <>
      {counter}
    </>
  )
}
const Button =({ type, label})=>{
  const dispatch =useCounterDispatch()
  return(
    <div>
      <button onClick={()=>dispatch({type})}>{label}</button>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <Display />
      <div>
        <Button  type='INC' label='+' />
        <Button  type='DEC' label='-' />
        <Button  type='ZERO' label='0' />


      </div>
    </div>
  )
}

export default App