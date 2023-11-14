import { Alert } from "react-bootstrap"

const AlertMessage = (props) => {
    const {message, type} = props

    return <>
        <Alert key={type} variant={type}>
            {message}!
        </Alert>
  </>
}

export default AlertMessage
