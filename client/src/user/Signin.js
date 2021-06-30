import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import Layout from "../core/Layout"
import { signin, authenticate, isAuthenticated } from "../auth"

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    })

    const { email, password, loading, error, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handelChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }).then((data) => {
            if (!data) {
                setValues({ ...values, error: "error", loading: false })
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                    })
                })
            }
        })
    }

    const signUpForm = () => (
        <div className='main-wrapper'>
            <div className='page-wrapper full-page'>
                <div className='page-content d-flex align-items-center justify-content-center'>
                    <div className='row w-100 mx-0 auth-page'>
                        <div className='col-md-8 col-xl-6 mx-auto'>
                            <div className='card'>
                                <div className='row'>
                                    <div className='col-md-4 pr-md-0'>
                                        <div className='auth-left-wrapper'></div>
                                    </div>
                                    <div className='col-md-8 pl-md-0'>
                                        <div className='auth-form-wrapper px-4 py-5'>
                                            <Link
                                                to='/'
                                                className='noble-ui-logo d-block mb-2'
                                            >
                                                Expense<span>Manager</span>
                                            </Link>
                                            <h5 className='text-muted font-weight-normal mb-4'>
                                                Welcome back! Log in to your
                                                account.
                                            </h5>
                                            <form className='forms-sample'>
                                                <div className='form-group'>
                                                    <label htmlFor='exampleInputEmail1'>
                                                        Email address
                                                    </label>
                                                    <input
                                                        type='email'
                                                        onChange={handelChange(
                                                            "email"
                                                        )}
                                                        className='form-control'
                                                        id='exampleInputEmail1'
                                                        placeholder='Email'
                                                        value={email}
                                                    />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='exampleInputPassword1'>
                                                        Password
                                                    </label>
                                                    <input
                                                        type='password'
                                                        className='form-control'
                                                        onChange={handelChange(
                                                            "password"
                                                        )}
                                                        id='exampleInputPassword1'
                                                        autoComplete='current-password'
                                                        placeholder='Password'
                                                        value={password}
                                                    />
                                                </div>
                                                <div className='form-check form-check-flat form-check-primary'>
                                                    <label className='form-check-label'>
                                                        <input
                                                            type='checkbox'
                                                            className='form-check-input'
                                                        />
                                                        Remember me
                                                    </label>
                                                </div>
                                                <div className='mt-3'>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-primary mr-2 mb-2 mb-md-0'
                                                        onClick={clickSubmit}
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <Link
                                                    to='/signup'
                                                    className='d-block mt-3 text-muted'
                                                >
                                                    Not a user? Sign up
                                                </Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const showError = () => (
        <div
            className='alert alert-danger'
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className='alert alert-info'>
                <h2>Loading..</h2>
            </div>
        )

    const redirectUser = (e) => {
        if (redirectToReferrer) {
            if (user) {
                console.info(user, e)
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    return (
        <Layout>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin
