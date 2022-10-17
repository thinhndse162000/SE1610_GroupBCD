import { useSelector } from 'react-redux'

const Alert = () => {
  const { alertType, alertText } = useSelector((state) => state.base)
  console.log("yes", alertText)
  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert
