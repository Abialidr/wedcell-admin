import imageCompression from "browser-image-compression";

const compressAndAppendFiles = async (files, formData, fieldName, from) => {
  console.log(`🚀 ~ files.map ~ compressedFile:`, files);
  if (files) {
    await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        if (file?.type == "application/pdf") {
          formData.append(fieldName, file);
        } else {
          try {
            let compressedFile = await imageCompression(file, options);
            compressedFile = new File([compressedFile], compressedFile.name);
            console.log(`🚀 ~ files.map ~ compressedFile:`, compressedFile);
            formData.append(fieldName, compressedFile);
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
  }
};

export const compressAndAppendFiles2 = async (files, formData, fieldName, from) => {
  console.log(
    `🚀 ~ file: compressAndAppendFiles.js:4 ~ compressAndAppendFiles ~ files:`,
    from,
    files
  );
  if (files) {
    await Promise.all(
      files.map(async (file) => {
        console.log(
          `🚀 ~ file: compressAndAppendFiles.js:8 ~ files.map ~ file:`,
          from,
          file.originFileObj,
          file
        );
        const options = {
          maxSizeMB: 0.5,
          useWebWorker: true,
          alwaysKeepResolution: false,
          // fileType: "image/webp",
        };
        if (file?.type == "application/pdf") {
          formData.append(fieldName, file.originFileObj);
        } else {
          try {
            let compressedFile = await imageCompression(
              file.originFileObj,
              options
            );
            console.log(
              `🚀 ~ file: compressAndAppendFiles.js:24 ~ files.map ~ compressedFile:`,
              from,
              compressedFile
            );
            compressedFile = new File([compressedFile], compressedFile.name);
            formData.append(fieldName, compressedFile);
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
  }
};

export const compressAndReturnFiles = async (
  files,
  formData,
  fieldName,
  from
) => {
  console.log(`🚀 ~ files.map ~ compressedFile:`, files);
  if (files) {
    const fi = await files.map(async (file) => {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        let compressedFile = await imageCompression(file, options);
        return new File([compressedFile], compressedFile.name);
      } catch (error) {
        return null;
        console.error(error);
      }
    });
    return await Promise.all(fi);
  }
};

export default compressAndAppendFiles;
