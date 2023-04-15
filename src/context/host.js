import React, { useState } from 'react'

const HostContext = React.createContext()

function HostProvider({ children }) {
    const [selectedHost, setSelectedHost] = useState(null)
    return (
        <HostContext.Provider value={{ selectedHost, setSelectedHost }}>
            {children}
        </HostContext.Provider>
    )
}

export { HostContext, HostProvider }