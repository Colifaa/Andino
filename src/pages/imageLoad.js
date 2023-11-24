import axios from 'axios';

const uploadUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

async function uploadFile(file) {
  const data = new FormData();
  data.append('file', file);

  const headers = {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    'pinata_api_key': 'fe3898969c15e7f996c5',
    'pinata_secret_api_key': '719d3ad6d2ec8efbe51c73cb26df781f13b6b2bd088c881ea6039d01174f6a39'
  };

  try {
    const response = await axios.post(uploadUrl, data, { headers });
    const cid = response.data.IpfsHash;
    const ipfsGateway = 'https://ipfs.io/ipfs/';
    const imageUrl = ipfsGateway + cid; 
    
    console.log('File uploaded successfully. CID:', cid);
    console.log('IPFS URL:', imageUrl);

    return { cid, url: imageUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error };
  }
}

function ImageLoad() {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    await uploadFile(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default ImageLoad;
