import React, { Component } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, List, Modal, PageHeader } from 'antd';
import { injectIntl } from 'react-intl';
import DashboardLayout from '../../layouts/DashboardLayout';
import SentryItem from './sentry/SentryItem';
import api from '../../helpers/Api';
import './Home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
    this.showCreateSentry = () => {
      this.props.history.push('/dashboard/newSentry');
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
    }

    const res = await api.getAllSentries();

    if (res.code === api.code.ok) {
      this.setState({
        isLoading: false,
        data: res.data.sentries,
      });
    } else {
      // no error code
      this.setState({
        isLoading: false,
      });

      const { intl } = this.props;
      Modal.error({
        title: intl.formatMessage({ id: 'sentryFailGet' }),
        onOk: () => {
          window.location.reload();
        },
      });
    }
  }

  SentryCard(item) {
    return <SentryItem item={item} />;
  }

  render() {
    return (
      <DashboardLayout page="home">
        <div>
          <PageHeader
            title="Active Sentries"
            extra={
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size="default"
                onClick={this.showCreateSentry}
              >
                Create Sentry
              </Button>
            }
          />
          <Divider />
          <List
            loading={this.state.isLoading}
            grid={{
              gutter: 4,
              xs: 1,
              sm: 1,
              md: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={this.state.data}
            renderItem={this.SentryCard}
          />
        </div>
      </DashboardLayout>
    );
  }
}

export default injectIntl(Home);
