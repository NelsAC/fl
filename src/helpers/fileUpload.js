import { updatePhotoUser } from '../firebase/providers';

export const fileUpload = async (file) => {
  if (!file)
    throw new Error(' No se tiene ninguna imagen selecciona existente ');

  const cloudinaryURL = `https://api.cloudinary.com/v1_1/dbmqyx6gp/upload`;

  const formData = new FormData();

  formData.append('upload_preset', 'react-fastlearning');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('No se puedo subir la imagen');

    const cloudinaryResp = await resp.json();

    if (resp.ok) {
      const result = await updatePhotoUser(cloudinaryResp.secure_url);

      return result;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
