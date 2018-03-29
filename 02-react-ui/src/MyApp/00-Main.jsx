import React from 'react'
import axios from 'axios'
import './style.css'
//   https://github.com/Edxael/Gral-02-18/blob/master/02-React/20-R-API-1/src/MyApp/01-Second.jsx

export default class extends React.Component{
    render(){

        const getAll = async () => {
            console.log("Get all the singers")

            let allRecords = await axios.get('http://localhost:5000/api/V1/singers')
                .catch((err) => { return err })

            console.log("The Result: ", allRecords.data)
        }

        return(
            <div>
                <h1>SINGERS CRUD-API</h1>
                <hr/>

                <div className="section" >
                    <button onClick={getAll} >Get All singers.</button>
                </div>

                <div className="section" >
                    <button>Get One By ID</button>
                </div>

            </div>
        )
    }
}