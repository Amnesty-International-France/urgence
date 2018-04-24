import React from 'react';

export const positionChoices = [{ id: 'top', name: 'Top' }, { id: 'bottom', name: 'Bottom' }];
export const colorChoices = ['000000', 'FFFF00', 'FFFFFF', 'd2026d', 'df3725', 'ed8122'].map(color => ({
    id: color,
    name: <div style={{ background: `#${color}`, width: '100%', height: '2rem' }} />
}));
