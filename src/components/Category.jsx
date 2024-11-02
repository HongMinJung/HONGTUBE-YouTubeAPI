import React from 'react';
import { categories } from '../utils/contents';

export default function Category( { setSelectCategory }) {
  return (
    <div className='catrgory_list'>
      {categories.map ((category) => (
        <button
          key={category.name}
          onClick={() => setSelectCategory(category.name)}
        >
          <span className='list_name'>
            {category.name}
          </span>
          <span className='list_icon'>{category.icon}</span>
        </button>
      ))}
    </div>
  );
};
