import React from 'react'
import Layout from 'antd/lib/layout/layout'
import styled from 'styled-components'

const AppLayout = ({ children }) => {
    return (
        <>
            <Layout>
                {children}
            </Layout>
            <Footer>

            </Footer>
        </>
    )
}


const Footer = styled.footer`
    height: 300px;
    background-color: #6A9695;
    color: white;
`

export default AppLayout