import axios from 'axios';

const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

async function uploadFile(file) {
 const data = new FormData();
 data.append('file', file);

 const headers = {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    'pinata_api_key': '96bcb01cab23ce55c883',
    'pinata_secret_api_key': '71501b126177b87aaa7b5bab28b725ac5c1ea8587595c19b986098482ac0d051',
 };

 try {
    const response = await axios.post(url, data, { headers });
    console.log('File uploaded successfully. CID:', response.data.IpfsHash);
 } catch (error) {
    console.error('Error uploading file:', error);
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