import React, { useState } from 'react'

const UploadButton = ({ ipfs }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUploadClick = async () => {
    if (!ipfs || !file) return

    const { cid } = await ipfs.add(file)
    console.log(`File uploaded to IPFS with CID: ${cid}`)
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload to IPFS</button>
    </div>
  )
}

export default UploadButton