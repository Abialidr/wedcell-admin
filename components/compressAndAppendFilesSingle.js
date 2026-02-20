import imageCompression from 'browser-image-compression';

const compressAndAppendFilesSingle = async (files) => {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    let compressedFile = await imageCompression(files, options);
    compressedFile = new File([compressedFile], compressedFile.name);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};

export default compressAndAppendFilesSingle;
