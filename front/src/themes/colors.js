export const transparent = 'transparent';
export const black = '#000';
export const white = '#fff';
export const yellow = '#ff0';
export const pink = 'rgba(210, 3, 109, 1)';
export const orange = '#ef8200';

export const textColorForBackgroundColor = bgColor =>
    [black, pink].includes(colors[bgColor]) ? white : black;

export const colors = {
    transparent,
    black,
    white,
    yellow,
    pink,
    orange,
};
