import classes from './FileUpload.module.css';
import React, { useState } from 'react';
import storage from '../../pages/firebase';
import doAjax from '../Helper/doAjax';

const FileUpload = () => {
  const [filetoUpload, setFiles] = useState('');
  const [displaydata, setDisplaydata] = useState(null);
  const upload = () => {
    if (filetoUpload == null)
      return;
    // storage.ref(`${filetoUpload.name}`).put(filetoUpload)
    //   .on("state_changed", alert("success"), alert);
    doAjax.post("/logitech.json", filetoUpload);
  }
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };
  const getJsonFileData = e => {
    e.preventDefault();
    doAjax.get('/logitech.json')
      .then((res) => {
        console.log(res.data);
        setDisplaydata(res.data);
      });
  };
  return (
    <React.Fragment>
      <form className={classes.form}>
        <div className={classes.control}>
          <label >Upload File</label>
          <input type="file" onChange={handleChange} />
        </div>
        <div className={classes.action}>
          <button onClick={upload}>Upload</button>
        </div>
        <div className={classes.action}>
          <button onClick={getJsonFileData}>display</button>
        </div>
        {/* <span>{filetoUpload}</span> */}
      </form>
      {displaydata !== null && <div>{displaydata["-Mh_5SYYvy5HBc7VwjxA"].map((item) => (
        <div>
          <ul>{item.name}</ul>
        </div>
      ))}
      </div>}
    </React.Fragment>
  );
};

export default FileUpload;
