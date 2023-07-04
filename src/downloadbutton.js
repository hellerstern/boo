import React from 'react';

const DownloadButton = ({ base64Image, fileName }) => {
  const handleDownload = () => {
    const blob = base64ToBlob(base64Image);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    return new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
  };

  return <button onClick={handleDownload}>Download</button>;
};

export default DownloadButton;