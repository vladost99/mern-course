import React, {useEffect, useState, useContext} from 'react'
import { useHttp } from './../hooks/http.hook';
import {useMessage} from './../hooks/message.hook';
import { AuthContext } from './../context/AuthContext';

export default function AuthPage() {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error]);

    useEffect(() => {
        window.M.updateTextFields();
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log(data);
        }
        catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        }
        catch (e) {}
    }



    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
            
                     <div className="card blue darken-1">
                      <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field">
                            <input 
                              placeholder="Введите email"
                              id="email"
                              type="text"
                              name="email"
                              value={form.email}
                              onChange={changeHandler}
                              className="yellow-input"
                            />
                            <label htmlFor="email">Введите email</label>
                        </div>
                        <div className="input-field">
                            <input
                              name="password"
                              onChange={changeHandler}
                              placeholder="Введите password"
                              id="password"
                              type="password"
                              value={form.password}
                              className="yellow-input"
                            />
                            <label htmlFor="email">Введите password</label>
                        </div>
                       </div>
                        <div className="card-action">
                            <button disabled={loading} onClick={loginHandler} className="btn yellow darken-4" style={{marginRight: '10px'}}>Войти</button>
                            <button disabled={loading} onClick={registerHandler} className="btn grey lighten-1 black-text">Регистрация</button>
                        </div>
                    </div>
                    </div>
                </div>
    )
}
