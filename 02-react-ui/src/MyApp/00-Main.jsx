import React from 'react'
//   https://github.com/Edxael/Gral-02-18/blob/master/02-React/20-R-API-1/src/MyApp/01-Second.jsx

export default class extends React.Component{
    render(){

        const getAll = () => {
            console.log("Get all the singers")
        }

        return(
            <div>
                <h1>SINGERS CRUD-API</h1>
                <hr/>

                <button onClick={getAll} >Get All singers</button>
            </div>
        )
    }
}