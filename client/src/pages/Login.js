import { Card, Input, Form, Button, notification } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import Cookies from 'json-cookie';

const Login = (props) => {
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = values => {
        authenticateUser(values)
    }

    const authenticateUser = async (params) => {
        setLoading(true)
        try {
            let response = await axios.post('/api/auth', params);
            let data = response?.data

            notification.success({ placement: "bottomRight", message: data?.message })
            Cookies.set('token', data?.token)
            props.history.push('/')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            notification.error({ message: error?.response?.data?.message })
        }
    }


    return (
        <StyledDiv>

            <Card style={{ minWidth: 300 }}>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Username is required" }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{ float: "right" }}
                            type="primary"
                            shape="round"
                            loading={isLoading}
                        >Login</Button>
                    </Form.Item>


                </Form>

            </Card>

        </StyledDiv>
    )
}

const StyledDiv = styled.div`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export default Login
