import React from 'react';

function highlightMatches(text, query) {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
}

const CardView = ({ image, name, id, phone, email, address, membership, searchQuery }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h2 className="text-xl font-semibold text-center mb-2 truncate" dangerouslySetInnerHTML={{ __html: highlightMatches(name, searchQuery) }}></h2>
      <button className={`block mx-auto font-bold text-xs text-center items-center rounded-full px-4 py-2 text-center mb-4 ${membership === 'Gold' ? 'bg-yellow-500' : membership === 'Silver' ? 'bg-gray-300' : 'bg-blue-200'}`}>{membership}</button>
      <div className="mt-4 text-xs">
        <p className="truncate"><strong>ID:</strong> {id}</p>
        <p className="truncate"><strong>Phone:</strong> {phone}</p>
        <p className="truncate"><strong>Email:</strong> {email}</p>
        <p className="truncate"><strong>Address:</strong> {address}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="bg-yellow-500 text-xs hover:bg-yellow-700 text-white py-2 px-4 rounded">Edit</button>
        <button className="bg-red-700 text-xs hover:bg-red-900 text-white py-2 px-4 rounded">Delete</button>
      </div>
    </div>
  );
};

export default CardView;
