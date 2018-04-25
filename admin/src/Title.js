import React from 'react';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        height: 48,
        marginRight: '1rem',
    }
};

export const Title = () => (
    <div style={styles.root}>
        <img src="/logo.svg" alt="Amnesty International" title="Amnesty International" style={styles.img} />
        Réaction Rapide
    </div>
);
