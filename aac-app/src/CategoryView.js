import React from 'react';
import './CategoryView.css';

const CategoryView = ({ category, onEdit, onSpeak }) => {
  return (
    <div className="category-view" onClick={onSpeak} onDoubleClick={onEdit}>
      {category.imageURL && <img src={category.imageURL} alt={category.name} className="category-image" />}
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryView;
