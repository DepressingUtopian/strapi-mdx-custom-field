/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import Tiptap from '../../components/Tiptap/Tiptap';
import pluginId from '../../pluginId';

import styled from '@emotion/styled';

const PageWrapper = styled.div`

`;

const HomePage = (): JSX.Element => {
    return (
        <PageWrapper>
            <Tiptap />
        </PageWrapper>
    );
};

export default HomePage;
