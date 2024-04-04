import {useRouteError} from 'react-router-dom'

function Error(){
    const Error = useRouteError();
    return(
        <div className="errorPage">
            <h2>{Error.status} - {Error.statusText}</h2>
            <p>{Error.data}</p>
        </div>
    )
}

export default Error;