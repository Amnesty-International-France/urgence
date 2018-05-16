export const black = '#000';
export const white = '#fff';
export const yellow = '#ff0';
export const pink = '#d2036d';
export const orange = '#ef8200';

export const textColorForBackgroundColor = bgColor =>
    [black, pink].includes(bgColor) ? white : black;

export const colors = {
    black,
    white,
    yellow,
    pink,
    orange,
};
