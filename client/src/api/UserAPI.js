import {useState, useEffect} from 'react'
import axios from 'axios'
let timer = null

export default function UserAPI() {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)    
    const [user, setUser] = useState([])
    const [token, setToken] = useState(false)
    
    console.log('token', token)
    console.log('logged', isLogged)
    console.log(localStorage.getItem('firstLogin'))

    useEffect(() => { 
        console.log('login')
        const firstLogin = localStorage.getItem('firstLogin')
        
            if (firstLogin) {
                const refreshToken = async () => {
                    await axios.get("/user/refresh_token")
                        .then(res => {
                            timer = setTimeout(() => {
                                refreshToken()
                            }, 100000)
                            console.log(res.data)
                            setToken(res.data.data)
                            setIsLogged(true)
                        })
                        .catch(err => {
                            setIsLogged(false)
                            setIsAdmin(false)
                            localStorage.removeItem('firstLogin')
                            alert(err.response.data.error.msg)
                            console.log(err.response.data)
                            clearTimeout(timer);
                        }) 
                        
                    }
                    refreshToken()
                }
       
    },[])

    useEffect(() =>{
        if (token){
            const getUser = async () => {
                try {
                    await axios.get('/user/user_info', {
                        headers: { Authorization: token }
                    })
                    .then(res => {
                        console.log(res.data)
                        setUser(res.data.data)
                        res.data.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    })
                    .catch(err => {
                        console.log(err.response.data)
                        alert(err.response.data.error.msg)

                    })

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
            }

            else{
                setIsLogged(false)
            }
    },[token])

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    token: [token, setToken]
  }
}

export const loginAPI = async (user) => {
    return await axios.post("/user/login", user)
}

export const registerAPI = async (user)  => {
    return await axios.post("/user/register", user)
}

export const logoutAPI = async ()  => {
    return await axios.get('/user/logout')
}

export const allUsersAPI = async () => {
    return await axios.get('/user/all_users')
}

export const userInfoAPI = async (id,token,user) => {
    await axios.get(`/user/user_info/${id}`, user,  {
    headers: {Authorization: token}
})
}

export const updateUserInfoAPI = async (id,token) => {
    await axios.put(`/user/update_user_info/${id}`,   {
    headers: {Authorization: token}
})
}
