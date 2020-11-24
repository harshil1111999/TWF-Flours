import React from 'react'
import fire from '../config/fire'
import { useDataLayerValue } from '../dataManagement/DataLayer';

function Profile() {

    const [{user}, dispatch] = useDataLayerValue();

    const logout = () => {
        fire.auth().signOut().then(() => {
            dispatch({
                type: "SET_USER",
                payload: null
            })
        })
    }

    return (
        <div>
            <div className="is-flex" style={{width: "100%", background: "rgb(72, 61, 139)"}}>
                <button className="button is-link is-light" style={{marginLeft: "auto", marginRight: "10px", marginTop: "5px", marginBottom: "5px"}} onClick={logout}>
                    <strong>Logout</strong>
                </button>
            </div>
            <div className="container is-flex" style={{justifyContent: "center", flexDirection: "column", width: "50%"}}>
                <div className="is-flex" style={{justifyContent: "center"}}>
                    <img src="https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png" 
                        style={{background: "white", width: "200px", height: "200px", border: "20px solid white", 
                            borderRadius: "100%", zIndex: "100"}} alt="user"/>
                </div>
                <div className="box" style={{paddingTop: "120px", transform: "translateY(-100px)", background: "rgb(72, 61, 139)"}}>
                    <div className="table-container" style={{display:"flex", justifyContent:"center"}}>
                        <table className="table is-striped" style={{width:"100%", borderRadius: "10px"}}>
                            <tbody>
                                <tr>
                                    <th style={{paddingLeft: "50px", fontSize:"20px"}}>Name</th>
                                    <td style={{paddingLeft: "100px", fontSize:"20px"}}>{user.name}</td>
                                </tr>
                                <tr>
                                    <th style={{paddingLeft: "50px", fontSize:"20px"}}>Date Of Birth</th>
                                    <td style={{paddingLeft: "100px", fontSize:"20px"}}>{user.dob}</td>
                                </tr>
                                <tr>
                                    <th style={{paddingLeft: "50px", fontSize:"20px"}}>Place Of Birth</th>
                                    <td style={{paddingLeft: "100px", fontSize:"20px"}}>{user.pob}</td>
                                </tr>
                                <tr>
                                    <th style={{paddingLeft: "50px", fontSize:"20px"}}>Age</th>
                                    <td style={{paddingLeft: "100px", fontSize:"20px"}}>{user.age}</td>
                                </tr>
                                <tr>
                                    <th style={{paddingLeft: "50px", fontSize:"20px"}}>Email Id</th>
                                    <td style={{paddingLeft: "100px", fontSize:"20px"}}>{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile