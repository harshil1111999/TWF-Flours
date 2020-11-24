import React, { useRef } from 'react'
import fire from '../config/fire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useDataLayerValue } from '../dataManagement/DataLayer';

function Signup() {

    const { register, errors, handleSubmit, watch } = useForm();
    const db = fire.database().ref('user')

    //used for to compare password and re_password
    const password = useRef({});
    password.current = watch("password", "");

    //save data to database and send emailVarificationLink
    const onSubmit = (value) => {
        fire.auth().createUserWithEmailAndPassword(value.email, value.password).then((user) => {
            fire.auth().currentUser.sendEmailVerification()
            document.getElementById("form").reset()
            toast.info("Varification email is sent!")
            const key = value.email.split("@")[0]
            db.child(key).set(value)
        }).catch(err => {
            toast.error(err.message);
        })
    }

    return (
        <div className="container is-flex" style={{width: "100%", justifyContent: "center"}}>
            <div className="is-flex form" style={{flexDirection: "column", marginTop: "40px", alignItems: "center", width: "50%"}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}} id="form">
                    <div className="is-flex" style={{flexDirection: "column"}}>
                        {/* name */}
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="xyz"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    ref={register({ required: "Name is required", 
                                                    maxLength: {
                                                        value: 30,
                                                        message: "Max length exceeded"
                                                    } })}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.name && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.name.message}</p>}
                        </div>

                        {/* dob */}
                        <div className="field">
                            <label className="label">Date Of Birth</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    aria-invalid={errors.dob ? "true" : "false"}
                                    ref={register({ required: "Date of birth is required"})}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.dob && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.dob.message}</p>}
                        </div>
                        
                        {/* pob */}
                        <div className="field">
                            <label className="label">Place Of Birth</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="text"
                                    id="pob"
                                    name="pob"
                                    placeholder="Vadodara"
                                    aria-invalid={errors.pob ? "true" : "false"}
                                    ref={register({ required: "Place of birth is required", 
                                                    maxLength: {
                                                        value: 30,
                                                        message: "Max length exceeded"
                                                    } })}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.pob && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.pob.message}</p>}
                        </div>

                        {/* age */}
                        <div className="field">
                            <label className="label">Age</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="number"
                                    id="age"
                                    name="age"
                                    placeholder="22"
                                    aria-invalid={errors.age ? "true" : "false"}
                                    ref={register({ required: "Age is required", 
                                                    min: {
                                                        value: 0,
                                                        message: "Age can not be negative value"
                                                    } })}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-address-card" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.age && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.age.message}</p>}
                        </div>

                        {/* email */}
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="xyz@gmail.com"
                                    aria-invalid={errors.email ? "true" : "false"}
                                    ref={register({ required: "Email is required"})}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.email && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.email.message}</p>}
                        </div>

                        {/* password */}
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="*******"
                                    aria-invalid={errors.password ? "true" : "false"}
                                    ref={register({ required: "Password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    },
                                                    validate: value => value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                                                        || "Password must contain atleast 1 capital letter, 1 special character and 1 digit"
                                                })}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.password && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.password.message}</p>}
                        </div>

                        {/* confirm password */}
                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input"
                                    type="password"
                                    id="repassword"
                                    name="repassword"
                                    placeholder="*******"
                                    aria-invalid={errors.repassword ? "true" : "false"}
                                    ref={register({ required: "Confirm password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },
                                        validate: value => value === password.current || "The passwords do not match" })}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </span>
                            </div>
                            {errors.repassword && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.repassword.message}</p>}
                        </div>
                    </div>
                    <div style={{marginTop: "20px", textAlign: "center"}}>
                        <button className="button is-link is-rounded is-outlined" style={{width: "40%"}}>Signup</button>
                    </div>   
                </form>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    )
}

export default Signup