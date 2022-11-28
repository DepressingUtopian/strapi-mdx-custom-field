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
    const [monaco, setMonaco] = useState<any>();
    const [editor, setEditor] = useState<any>();

    return (
        <PageWrapper>
            <h1>{pluginId}&apos;s HomePage22</h1>
            <Tiptap />
        </PageWrapper>
    );
};

export default HomePage;
