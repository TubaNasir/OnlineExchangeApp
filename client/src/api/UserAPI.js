import { useState, useEffect } from 'react'
import axios from 'axios'
let timer = null

export default function UserAPI() {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser] = useState([])
    const [seller, setSeller] = useState([])
    const [token, setToken] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userCallback, setUserCallback] = useState(false)
    const [cart, setCart]= useState([])
    const [userCartDetails, setUserCartDetails] = useState([])
    console.log('token', token)
    console.log('logged', isLogged)
    console.log(localStorage.getItem('firstLogin'))
    const firstLogin = localStorage.getItem('firstLogin')

    useEffect(() => {
        console.log('login')
        
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
                            setUser(false)
                            setCart([])
                            localStorage.removeItem('firstLogin')
                            alert(err.response.data.error.msg)
                            console.log(err.response.data)
                            clearTimeout(timer);
                        }) 
                        
                    }
                    refreshToken()
                }
       
            refreshToken()
    
        const getAllUsers = async () => {
            await axios.get('/user/all_users')
                .then(res => {
                    console.log(res.data)
                    setAllUsers(res.data.data)
                })
                .catch(err => {
                    console.log(err.response.data)
                    alert(err.response.data.error.msg)

                })
        }
        getAllUsers()
        }, [])
    
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    await axios.get(`/user/user_info`, {
                        headers: { Authorization: token }
                    })
                    .then(res => {
                        console.log(res.data)
                        setUser(res.data.data)
                        setCart(res.data.data.cart)
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
    },[token,userCallback])

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    token: [token, setToken],
    allUsers: [allUsers,setAllUsers],
    cart: [cart, setCart],
    userCartDetails: [userCartDetails, setUserCartDetails]
  }
}

export const loginAPI = async (user) => {
    return await axios.post("/user/login", user)
}

export const registerAPI = async (user) => {
    return await axios.post("/user/register", user)
}

export const logoutAPI = async () => {
    return await axios.get('/user/logout')
}

export const allUsersAPI = async () => {
    return await axios.get('/user/all_users')
}

export const userInfoAPI = async (id, token) => {
    console.log('sellerid', id)
    return await axios.get(`/user/user_info/${id}`, {
        headers: { Authorization: token }
    })
}

export const updateUserInfoAPI = async (user, token) => {
    return await axios.patch(`/user/update_user_info`, user, {
        headers: { Authorization: token }
    })
}

export const updateCartAPI = async (cart,token) => {
    return await axios.patch(`/user/add_to_cart`, cart, {
    headers: {Authorization: token}
})
}