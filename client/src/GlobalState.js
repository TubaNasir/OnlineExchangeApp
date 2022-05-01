import React, { createContext, useState, useEffect } from 'react'
import UserAPI from './api/UserAPI'
import CategoryAPI from './api/CategoryAPI'
import AdvertisementAPI from './api/AdvertisementAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const state = {
        UserAPI: UserAPI(),
        CategoryAPI: CategoryAPI(),
        AdvertisementAPI: AdvertisementAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
