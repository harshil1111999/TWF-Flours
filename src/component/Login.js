import React, { useRef } from 'react'
import fire from '../config/fire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { useDataLayerValue } from '../dataManagement/DataLayer';

function Login() {

    const { register, errors, handleSubmit, watch } = useForm();
    const [{user}, dispatch] = useDataLayerValue();
    const email = useRef({});
    email.current = watch("email", "");

    const onSubmit = (value) => {
        fire.auth().signInWithEmailAndPassword(value.email, value.password).then((user) => {
            const key = value.email.split("@")[0]
            const ref = fire.database().ref('/user/' + key)
            ref.on('value', (snapshot) => {
                dispatch({
                    type: "SET_USER",
                    payload: snapshot.val()
                })
            })
            toast.info("Logged in successfully");
        }).catch((err) => {
            toast.error(err.message);
        })
    }

    const handleForgotPassword = () => {
        if(email.current === "") {
            toast.error("Please enter your email id");
        } else {
            fire.auth().sendPasswordResetEmail(email.current).then(() => {
                toast.info("Your password is updated successfully!")
            }).catch(err => {
                console.log(err)
            })
            toast.info("Reset password email is sent!")
        }
    }

    return (
        <div className="container is-flex" style={{width: "100%", justifyContent: "center"}}>
            {/* <div className="box is-flex" style={{margin: "20px", flexDirection: "column", alignItems: "center"}}> */}
                <div className="is-flex form" style={{flexDirection: "column", marginTop: "40px", alignItems: "center", width: "50%"}}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                        <div className="is-flex" style={{flexDirection: "column"}}>
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
                            <div className="field" style={{marginBottom: "0px"}}>
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
                                {errors.password && (
                                    <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.password.message}</p>
                                )}
                            </div>
                            <a style={{marginLeft: "auto"}} onClick={handleForgotPassword}>Forgot Password?</a>
                        </div>
                        <div style={{marginTop: "20px", textAlign: "center"}}>
                            <button className="button is-link is-rounded is-outlined" style={{width: "40%"}}>Login</button>
                        </div>   
                    </form>
                </div>
            {/* </div> */}
            <ToastContainer position="bottom-right"/>
        </div>
    )
}

export default Login