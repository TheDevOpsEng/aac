import React, { useState } from 'react';
import CategoryView from './CategoryView';
import ImagePicker from './ImagePicker';
import './CategoriesView.css';

const predefinedCategories = [
  {
    id: 1,
    name: 'Greetings',
    imageURL: null,
    subcategories: [
      { id: 1, name: 'Hello', imageURL: null },
      { id: 2, name: 'Goodbye', imageURL: null }
    ]
  },
  {
    id: 2,
    name: 'Emotions',
    imageURL: null,
    subcategories: [
      { id: 1, name: 'Happy', imageURL: null },
      { id: 2, name: 'Sad', imageURL: null }
    ]
  },
  {
    id: 3,
    name: 'Colors',
    imageURL: null,
    subcategories: [
      { id: 1, name: 'Red', imageURL: null },
      { id: 2, name: 'Blue', imageURL: null }
    ]
  }
];

const loadCategories = () => {
  const savedCategories = localStorage.getItem('categories');
  return savedCategories ? JSON.parse(savedCategories) : predefinedCategories;
};

const CategoriesView = () => {
  const [categories, setCategories] = useState(loadCategories());
  const [showingImagePicker, setShowingImagePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleImageUpload = (image) => {
    if (selectedCategory) {
      const newCategories = categories.map((cat) => {
        if (cat.id === selectedCategory.id) {
          if (selectedCategory.subcategory) {
            return {
              ...cat,
              subcategories: cat.subcategories.map((sub) =>
                sub.id === selectedCategory.subcategory.id
                  ? { ...sub, imageURL: URL.createObjectURL(image) }
                  : sub
              )
            };
          } else {
            return { ...cat, imageURL: URL.createObjectURL(image) };
          }
        }
        return cat;
      });
      setCategories(newCategories);
      saveCategories(newCategories);
    }
  };

  const saveCategories = (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const handleSubcategoryEdit = (category, subcategory) => {
    setSelectedCategory({ ...category, subcategory });
    setShowingImagePicker(true);
  };

  const handleSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryView
              category={category}
              onEdit={() => {
                setSelectedCategory(category);
                setShowingImagePicker(true);
              }}
              onSpeak={() => handleSpeech(category.name)}
            />
            <div className="subcategories-grid">
              {category.subcategories.map((subcategory) => (
                <CategoryView
                  key={subcategory.id}
                  category={subcategory}
                  onEdit={() => handleSubcategoryEdit(category, subcategory)}
                  onSpeak={() => handleSpeech(subcategory.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showingImagePicker && (
        <ImagePicker
          onImageSelected={(image) => {
            handleImageUpload(image);
            setShowingImagePicker(false);
          }}
          onCancel={() => setShowingImagePicker(false)}
        />
      )}
    </div>
  );
};

export default CategoriesView;
