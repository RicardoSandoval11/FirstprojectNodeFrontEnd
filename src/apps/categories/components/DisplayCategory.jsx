import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { formatDates } from '../../../helpers/formatDates';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const DisplayCategory = ({category}) => {

    const baseUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 350, margin: 1, minWidth: 350 }}>
      <CardHeader
        title={category.name}
        subheader={formatDates(category.updatedAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image={baseUrl +'/'+category.coverImg}
        alt="Company logo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {category.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link
            to={`/vacancy/vacancies-by-category/${category.id}`}
            style={{
                textDecoration: 'none',
                color: '#919191',
                display: 'block',
                padding: 2,
                margin: 2
            }}
        >
            View Related Jobs
        </Link>
    </CardActions>
    </Card>
  );
}