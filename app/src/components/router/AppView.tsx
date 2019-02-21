import { Icon, Layout, Menu, Row, Col, Button, Popover } from 'antd'
import React, { useState, ReactNode } from 'react'
import { Location, navigate } from '@reach/router'
import firebase from '../../firebase'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu

const AppView = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed)
        }}
      >
        <div className="logo" />
        <Location>
          {({ location }: any) => {
            return (
              <Menu
                theme="dark"
                defaultSelectedKeys={[location.pathname]}
                mode="inline"
                defaultOpenKeys={collapsed ? [] : ['lists']}
              >
                <Menu.Item
                  key="/"
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  <Icon type="stock" />
                  <span>Dashboard</span>
                </Menu.Item>
              </Menu>
            )
          }}
        </Location>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: '#fff',
            borderBottom: '1px solid #f0f2f5'
          }}
        >
          <Row type="flex" justify="end">
            <Col style={{ padding: '0 1em' }}>
              <Popover
                title="User Settings"
                content={
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      firebase.auth().signOut()
                    }}
                  >
                    Logout
                  </span>
                }
                placement="bottomLeft"
              >
                <Button
                  style={{ cursor: 'pointer' }}
                  shape="circle"
                  icon="setting"
                />
              </Popover>
            </Col>
          </Row>
        </Header>
        <Content style={{ backgroundColor: '#fff', padding: '1em' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppView
