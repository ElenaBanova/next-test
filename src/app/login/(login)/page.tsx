import React from 'react';
import Form from "next/form";
import loginUser from "@/server-actions/serverActions";
import '../login-css/login.css';


const LoginPage = () => {

    return (
        <div>
            <div className={'menu'}></div>
            <div className={'form-page'}>
                <Form action={loginUser} className={'form'}>
                    <h3 className='form-name'>Authentication form</h3>
                    <label>
                        <input className={'form-input'} type="text" placeholder="Username"
                               name={'username'}/>
                    </label>
                    <label>
                        <input className={'form-input'} type="password"
                               placeholder="Password"
                               name={'password'}/>
                    </label>
                    <button className={'form-button'} type="submit"
                    >Login
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;