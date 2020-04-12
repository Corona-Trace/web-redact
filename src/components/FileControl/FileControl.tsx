import React from 'react';
import styled from 'styled-components';
import fileService from '../../services/file.service';

const Button = styled.label`
  align-items: center;
  background-color: #5eb95e;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  color: white;
  font-size: 100%;
  line-height: normal;
  padding: 0.5em 1em;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  zoom: 1;
`;

function FileControl({ onFileLoaded }) {
  const handleChange = async (e) => {
    const data = await fileService.loadFile(e);
    onFileLoaded(data);
  };
  return (
    <div>
      <input type="file" id="upload-file" name="file" onChange={(e) => handleChange(e)} hidden />
      <Button htmlFor="upload-file">Import Goole Takeout</Button>
    </div>
  );
}

export default FileControl;
