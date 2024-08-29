import React from 'react';

type Props = {};

const BussinessesLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <React.Fragment>{children}</React.Fragment>
    );
};

export default BussinessesLayout;