import React, {useState, useEffect, useContext} from 'react'
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function Createpage() {
    const [link, setLink] = useState();
    const history = useHistory();
    const {request} = useHttp();
    const auth = useContext(AuthContext);

    useEffect(() => {
        window.M.updateTextFields();
    })

    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
             const data =  await request('/api/link/generate', 'POST', {from: link}, {
                 Authorization: `Bearer ${auth.token}`
             });
            history.push(`/detail/${data.link._id}`);
            }
            catch (e) {}
        }
    }
    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
            <div className="input-field">
                            <input 
                              placeholder="Enter link"
                              id="link"
                              type="text"
                              value={link}
                              onKeyPress={pressHandler}
                              onChange={ e => setLink(e.target.value)}
                            />
                            <label htmlFor="link">Введите link</label>
                        </div>
            </div>
        </div>
    )
}
