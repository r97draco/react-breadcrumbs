import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ArticleIcon from '@mui/icons-material/Article';

//--------------------Box Component for Content--------------------
export default function BoxComponent(props) {

  //To render list of items in the props.content array
  const List = () => {
    return (
      <ul>
        {props.content.map(item => {
        return (item.indexOf('.txt') <= 0 && item.indexOf('file') <=0)?
        <ListItem>
          <InsertLinkIcon/>
         <Link key={item} onClick={()=> props.selected(item)}>{item}</Link>
        </ListItem>
        :
        <ListItem> 
          <ArticleIcon/>
          {"This is a File--->  "} 
          <Link sx={{color:"yellow"}} key={item} >{item}</Link>
        </ListItem>
        ;
      })}
      </ul>
    );
  }
  return (
    <Box >
      <p sx={{color:"blue"}}>Content ----------------</p>
        <List>
          {List()}
        </List>
    </Box>
  );
}
//---- End of File BoxComponent.js ----//