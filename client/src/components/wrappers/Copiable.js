import React, { useState } from 'react';
import CopyToClickboard from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';

const Copiable = ({ children: Component, textToCopy }) => {
    const [ copied, setCopied ] = useState(false);
    const tooltipMessage = copied ? 'Copied to clickboard' : 'Click to copy';

    return (
        <Tooltip title={tooltipMessage} arrow placement="top">
            <CopyToClickboard text={textToCopy}
                    onCopy={() => setCopied(true)}>
                { Component }
            </CopyToClickboard>
        </Tooltip>
    );
};

export default Copiable;
