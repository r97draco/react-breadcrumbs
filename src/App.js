import "./App.css";
import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "./components/Navbar";
import BasicBreadcrumbs from "./components/BasicBreadcrumb";
import BoxComponent from "./components/BoxComponent";

//---- Start of APP ----//
function App() {
  // ---- APIs Section --- //
  const [dirContent, setDirContent] = useState([]);

  // Get the initial directories from the server
  const fetchDirectories = async () => {
    const res = await axios.get('http://127.0.0.1:8080/get_initial');
    setCrumbs(res.data);
   };

  // Get the contents of a particular directory from the server
  const getDirectoryContent = async (dirName) => {
    const res = await axios.get('http://127.0.0.1:8080/get_contents?directory='+dirName);
    let arr = [];
    if(res.data == null || res.data == undefined){
      arr.push("No Content");
    }
    // else if (res.data.length === 0 || res.data[0].type === 'file'){
    //   arr.push("File Name is: "+dirName);
    // }
    else{
    res.data.forEach(element => {
      arr.push(...Object.keys(element))
    });
    }
    setDirContent(arr);
   };

  // Get the contents of a particular path from the server
  const getPathContent = async (dirName) => {
    const res = await axios.get('http://127.0.0.1:8080/get_me?path='+dirName);
    let arr = [];
    if(res.data == null || res.data == undefined){
      arr.push("No Content");
    }
    else{
    res.data.forEach(element => {
      arr.push(...Object.keys(element))
    });
    }
    setDirContent(arr);
   };

   useEffect(() => {
    fetchDirectories(); //fetching initial directories
    // getDirectoryContent(crumbs[0]);
  },[])

  // ---- End APIs Section --- //
  
  // ---- Methods Section --- //

  const [crumbs, setCrumbs] = useState([]);
  var path = "";

  // To set the breadcrumbs
  const selected = crumb => {
    // getDirectoryContent(crumbs[crumb])
    path = crumbs.slice(0, crumb + 1).join("/");
    getPathContent(path);
    setCrumbs(crumbs.slice(0, crumb + 1));
  }

  //Modify the directory content and breadcrumbs to when a directory is clicked
  const showdir = crumb => {
    // getDirectoryContent(crumb)
    crumbs.push(crumb);
    // path = crumbs.slice(0, crumb + 1).join("/");
    path= crumbs.join("/");
    getPathContent(path);
  }

  const showfile = crumb => {
    crumbs.push(crumb);
    path= crumbs.join("/");
    getPathContent(path);
    // return <p>{"This is a File: "}{crumb}</p>
  }
  // ---- Methods End --- //

  return (
    <div className="App">
      <Navbar data={"Breadcrumbs Demo"}/>
      <header className="App-header">
        <BasicBreadcrumbs crumbs={crumbs} selected={selected}/>
        <BoxComponent content={dirContent}  dir={showdir}  fil={showfile}/>
      </header>
    </div>
  );
}
//---- End of APP ----//

// Directory Structure for testing;
const eroot = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        myname: {
          type: "dir",
          children: {
            "filea.txt": {
              type: "file",
            },
            "fileb.txt": {
              type: "file",
            },
            projects: {
              type: "dir",
              children: {
                mysupersecretproject: {
                  type: "dir",
                  children: {
                    mysupersecretfile: {
                      type: "file",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default App;

//---- End of File APP.js ----//
