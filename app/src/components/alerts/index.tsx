import * as React from 'react'
import { getAlerts } from '../../graphql/queries/alerts'
import { deleteAlert } from '../../graphql/mutations/alerts'
import { Alert } from 'antd'
import { Query, Mutation } from 'react-apollo'

const Alerts = () => {
  return (
    <React.Fragment>
      <Query query={getAlerts}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>
          }
          if (error) {
            return <div>Error</div>
          }
          if (data && data.alerts.length > 0) {
            return data.alerts.map(
              (item: {
                id: string
                type?: 'success' | 'info' | 'warning' | 'error'
                title: string
                message: string
              }) => {
                return (
                  <Mutation key={item.id} mutation={deleteAlert}>
                    {(deleteAlert, { data }) => (
                      <Alert
                        message={item.title ? item.title : item.message}
                        description={item.title ? item.message : ''}
                        type={item.type}
                        banner
                        closable
                        onClose={() => {
                          deleteAlert({ variables: { id: item.id } })
                        }}
                      />
                    )}
                  </Mutation>
                )
              }
            )
          } else {
            return <div />
          }
        }}
      </Query>
    </React.Fragment>
  )
}

export default Alerts
