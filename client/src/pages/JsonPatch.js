import { Card, Row, Col, Descriptions, List, Button, Tag, notification } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import Cookies from 'json-cookie';

const JsonPatch = (props) => {
    const original = { firstName: "Albert", contactDetails: { phoneNumbers: [] } };
    const patch = [
        { op: "replace", path: "/firstName", value: "Joachim" },
        { op: "add", path: "/lastName", value: "Wester" },
        { op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" } }
    ];
    const placement = "bottomRight";

    const token = Cookies.get('token');

    const [newDocument, setNewDocument] = useState(null);
    const [isLoading, setLoading] = useState(false)

    const handlePatch = async (params) => {
        setLoading(true);
        setNewDocument(null);

        try {
            let response = await axios.patch('/api/json-patch', { document: original, patch }, { headers: { bearer: token } })
            let content = response?.data?.content
            setNewDocument(content)
            notification.success({ placement, message: response?.data?.message })
            setLoading(false)

        } catch (error) {

            notification.warning({ placement, message: "Patch Error", description: error.response.data.message })
            setLoading(false)
        }
    }
    const handleLogin = (params) => {
        props.history.push('/login')
    }

    const handleLogOut = (params) => {
        Cookies.delete('token')
        notification.success({ placement, message: "Logout successful" })
        props.history.go(0);
    }



    return (
        <StyledDiv>
            <br />
            <div style={{ paddingBottom: 20 }}>

                {token ?
                    <Button
                        style={{ float: "right" }}
                        type="primary"
                        danger
                        onClick={handleLogOut}
                    >Logout</Button>
                    :
                    <Button
                        style={{ float: "right" }}
                        type="primary"
                        onClick={handleLogin}
                    >Login</Button>

                }
            </div>
            <br />

            <Row gutter={[10, 10]}>
                <Col xl={6} xs={24}>
                    <Card title="Original Document">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="First Name">{original.firstName}</Descriptions.Item>
                            <Descriptions.Item label="Contacts">
                                {original.contactDetails.phoneNumbers.map(phone => phone?.number)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xl={12} xs={24}>
                    <Card title="Patch" extra={
                        <Button
                            type="primary"
                            onClick={handlePatch}
                            loading={isLoading}
                        >Apply Patch</Button>}>
                        <List
                            bordered
                            dataSource={patch}
                            renderItem={(data) => {
                                let color = data?.op === "add" ? "blue" : "red"
                                return <List.Item>

                                    <div><Tag color={color}>{data?.op.toUpperCase()}</Tag></div>
                                    <div><b>Path:</b> {data?.path}</div>
                                    <div><b>Value:</b> {data?.value?.number ? data?.value?.number : data?.value}</div>

                                </List.Item>
                            }
                            }
                        />
                    </Card>
                </Col>
                <Col xl={6} xs={24}>
                    <Card title="New Document" loading={isLoading}>
                        {newDocument && (
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="First Name">{newDocument.firstName}</Descriptions.Item>
                                <Descriptions.Item label="Last Name">{newDocument.lastName}</Descriptions.Item>
                                <Descriptions.Item label="Contacts">
                                    {newDocument?.contactDetails?.phoneNumbers.map(phone => phone?.number)}
                                </Descriptions.Item>
                            </Descriptions>
                        )}

                    </Card>
                </Col>
            </Row>



        </StyledDiv>
    )
}

const StyledDiv = styled.div`
background-color: #282c34;
min-height: 100vh;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 10px;
`

export default JsonPatch
