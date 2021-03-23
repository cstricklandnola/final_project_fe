//import {fetchAllItems} from "../../api"
import {useState, useEffect} from 'react'
const Routines = () =>{
    const [fetchedAllItems, setFetchedAllItems] = useState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllItems = async () => {
        try{
            const routines = await fetchAllRoutines(); 
            setFetchedAllItems(routines)
        }catch (error) {console.error(error)
        }
    }

    useEffect( getAllItems, []);
    return(
        <div>
        <h1>Welcome to Store Front</h1>
        <div className ="results">
         {fetchedAllItems?.map((item, index) => { 
            return (
               <div className = "listing" key={index}>
                    <h2>Routine:{routine.name}:: Created by {routine.creatorName}</h2>
                    <hr></hr>
                    <h4>Goal:{routine.goal}</h4>
                    
                    {routine.activities[0] ?
                        routine.activities.map((activity1, index) => {
                            return(
                                <h6 key={index}><ul >
                                    <li>Activity: {activity1.name}</li>
                                    <li>Description: {activity1.description}</li>
                                    <li>Duration:{activity1.duration}</li>
                                    <li>Count:{activity1.count}</li>
                                </ul></h6>) 
                        
                        }) 
                        :<b>No activities have been added to this routine</b>}
                    
               </div> 
            ) 
        
        
        
        
        })}
        </div>
        </div>
   )
}   

export default Routines