import React, { Component } from 'react';
import styled from 'styled-components';

const ManageAnalyticsStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

const ShowAnalytics = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    background-color: white;
`;

const CreateAnalytics = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    background-color: white;
`;

class ManageAnalytics extends Component {
    render() {
        return (
            <ManageAnalyticsStyle>
                <ShowAnalytics>
                    Все новости
                </ShowAnalytics>
                <CreateAnalytics>
                    Создать новость
                </CreateAnalytics>
            </ManageAnalyticsStyle>
        );
    }
}

export default ManageAnalytics;