const express = require('express')
const app = express()
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


//for testing another directory
// const directories = {
//   root: {
//   type: "dir",
//   children: {
//     games: {
//       type: "dir",
//       children: {
//         secretdir: {
//           type: "dir",
//           children: {
//             "yello.txt": {
//               type: "file",
//             },
//             "blue.txt": {
//               type: "file",
//             }
//           },
//         },
//       },
//     },
//   },
// },
// };

const directories = {
  root: {
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
},
};

//------------------ Methods ------------------//

//Creating a list of directories for initial breadcrumb
var directoryList = [];

const iterate = (obj) => {
  Object.keys(obj).forEach(key => {
  //console.log(`key: ${key}, value: ${obj[key]
  if (typeof obj[key] === 'object' && obj[key] !== null) {

    // getting list of directories for initial breadcrumb
    if (key !== 'children' && obj[key].type == 'dir'){
      //console.log(key);
      directoryList.push(key);
    }
        iterate(obj[key])
      }
  })
}

var directoryContent = [];

const iterateContents = (obj, directoryName) => {
  Object.keys(obj).forEach(key => {
  if (typeof obj[key] === 'object' && obj[key] !== null) {
    if (key === directoryName){
      console.log("OKOOOKKOK")
      console.log("key",obj[key].type)
      console.log(obj[key].children)
      if(obj[key].type == 'file'){
        directoryContent.push({type: "This is a File:"+directoryName});
      }else{
      // if(obj[key].children == undefined){
      //   directoryContent.push("This is a File:"+directoryName);
      // }else{  
        directoryContent.push(obj[key].children)
      }
      return;
    }
      iterateContents(obj[key], directoryName)
      }
  })
}

//------------------ End of Methods ------------------//


//console.log(iterateContents(directories, ""))
//console.log(Object.keys(directories));
//console.log(root.children);

//------------------ API methods ------------------//
app.use(cors(corsOptions)) // Use this after the variable declaration

// API to get the Entire Directory Structure for testing
app.get('/root/', (req, res) => {
  res.send(directories.root)
})

// API to get the initial directories for the breadcrumb
app.get('/get_initial/', (req, res) => {
  directoryList = []
  iterate(directories)
  res.send(directoryList)
})

// API to get the contents of a given directory
app.get('/get_contents/', (req, res) => {
  directoryContent = []
  iterateContents(directories, req.query.directory)
  res.send(directoryContent)
})


// Port to run the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running on port 8080')
})
//------------------ End of API methods ------------------//