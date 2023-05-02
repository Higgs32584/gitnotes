import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-core';
import all from 'it-all';
import { concat } from 'uint8arrays/concat';
import { toString } from 'uint8arrays/to-string';

function App() {
  const [fileContents, setFileContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedNotes, setUploadedNotes] = useState([]);
  const [node, setNode] = useState(null);

  // Create an IPFS node on component mount
  useEffect(() => {
    async function createIPFSNode() {
      try {
        const node = await create();
        const version = await node.version();
        console.log('IPFS Version:', version.version);

        setNode(node);
      } catch (error) {
        console.error('Failed to create IPFS node:', error);
      }
    }

    createIPFSNode();
  }, []);

  // Update the selected file when the user selects a new file
  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload the selected file to IPFS and update the uploaded notes
  const handleFileUpload = async () => {
    if (!selectedFile || !node) {
      return;
    }
    if (selectedFile && selectedFile.name.endsWith(".txt")) {
      setSelectedFile(selectedFile);
      try {
        const file = await node.add({
          path: selectedFile.name,
          content: selectedFile,
        });
  
        console.log('Added file:', file.path, file.cid.toString());
  
        const noteHash = file.cid.toString();
  
        if (uploadedNotes.find((note) => note.hash === noteHash)) {
          alert('This note has already been uploaded');
          return;
        }
  
        const noteData = concat(await all(node.cat(file.cid)));
        const noteLink = `https://ipfs.io/ipfs/${noteHash}`;
  
        setUploadedNotes([...uploadedNotes, { hash: noteHash, link: noteLink }]);
        setFileContents(toString(noteData));
      } catch (error) {
        console.error('Failed to upload file to IPFS:', error);
      }
    } else {
      setSelectedFile(null);
      alert("Please select a .txt file");
    }

  };

  return (
    <div>
      <p>File contents: {fileContents}</p>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadedNotes.length > 0 ? (
        <ul>
          {uploadedNotes.map(({ hash, link }) => (
            <li key={hash}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {hash}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes have been uploaded yet</p>
      )}
    </div>
  );
}

export default App;