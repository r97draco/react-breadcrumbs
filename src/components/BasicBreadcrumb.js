import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box } from '@mui/system';


const BasicBreadcrumb = (props) => {
  let path = window.location;
  console.log("basic",props.crumbs)
  
  return (
    <Box color='white' role="presentation">
      <Breadcrumbs aria-label="breadcrumb" color='white'  separator=">>" >
        {props.crumbs.map((crumb, i)=> {
          return (
            <Link underline="hover" color="green" 
            // href= {path + "/"+ crumb}
            key={i}
            onClick={ () => props.selected(i)} >
              {crumb}
          </Link>
          );
        })};
      </Breadcrumbs>
    </Box>
  );
}

export default BasicBreadcrumb