import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type CardProps = {
    children: React.ReactNode;
    size?: string;
};

export const Card = ({ size = 'full', children }: CardProps) => (
    <MuiCard
        sx={{
            margin: '1rem 1rem 2rem',
            width: size === 'full' ? '100%' : 450,
        }}
    >
        <CardContent
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > span > .RaLabeled-label, & > .MuiFormControl-root > .MuiInputLabel-root, & > .MuiFormControl-root > .MuiFormLabel-root ':
                    {
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        lineHeight: '1.5',
                        marginBottom: '0.2em',
                        transform: 'scale(1)',
                    },
                '& > .MuiFormControl-root > .MuiInputLabel-root + .MuiInput-root': {
                    marginTop: '30px',
                },
                '& .RaRichTextInputToolbar-root': {
                    flexWrap: 'wrap',
                    gap: '5px',
                },
            }}
        >
            {children}
        </CardContent>
    </MuiCard>
);
