import React from 'react';

const ImagePicker = ({ onImageSelected, onCancel }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div className="image-picker">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ImagePicker;
