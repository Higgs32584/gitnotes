import './App.css';
import React, { useState } from 'react';
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)

function App() {
// Build a simple React project named “gitnotes” with the following specifications:
// – Generate an alert if that same file (i.e. hash) has been uploaded
// before stating “This note has already been uploaded”
// • If the note has not been uploaded before:
// – Upload the note to IPFS and display the IPFS hash (you can also
// console.log the hash in the terminal as well)
// • In a list, display:
// – The name of the note
// – The hash of the note on IPFS
// • For every note in the list, the hash should be clickable and should open
// an IPFS gateway link to that given note.
// • If there are no notes display the text “No notes have been uploaded yet”



  const [selectedFile, setSelectedFile] = useState();
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};
  const handleSubmission = () => {
  }

  return (

    <div className="App">
   <div>
   {/*• A button that shows “Choose File”. This button should: */}
   {/* – If clicked, allow a user to select a .txt file from their computer */}
			<input type="file" accept= ".txt" name="file" onChange={changeHandler} />
			<div>
			</div>
      <div>
      {/* // • A button that shows “Upload” to upload the given note to IPFS */}
				<button>Upload</button>
			</div>
		</div>

    </div>
  );
}

export default App;