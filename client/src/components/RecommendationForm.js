import React, { useState } from 'react';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { ClipLoader } from 'react-spinners';

// Gender, events, and countries data
const genders = ['Male', 'Female', 'Other'];
const events = ['Wedding', 'Party', 'Office', 'Meeting', 'Date', 'Outdoor', 'Casual Meet'];
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 
  'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 
  'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 
  'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 
  'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 
  'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 
  'Zambia', 'Zimbabwe'
];

// Clothing items and their types
const clothingItems =  ['TShirt', 'Shirt', 'Blouse', 'Sweater', 'Hoodie', 'Jacket', 'Coat', 'Pants', 'Skirt', 'Dress', 'Shoes', 'Underwear', 'Accessories'];
const clothingTypes = {
    TShirt: ['V-neck', 'Crew neck', 'Scoop neck', 'Polo', 'Henley', 'Raglan', 'Tank top', 'Sleeveless', 'Long sleeve', 'Graphic'],
    Shirt: ['Casual', 'Formal', 'Bohemian', 'Cuban', 'Dress', 'Oxford', 'Chambray', 'Flannel', 'Linen', 'Western', 'Tuxedo', 'Hawaiian'],
    Blouse: ['Peplum', 'Wrap', 'Off-shoulder', 'Button-up', 'Tie-front', 'Pussy bow', 'Ruffled', 'Smocked', 'Sheer', 'Cropped'],
    Sweater: ['Pullover', 'Cardigan', 'Crew neck', 'V-neck', 'Turtleneck', 'Mock neck', 'Cable knit', 'Sweater vest', 'Hooded', 'Fleece'],
    Hoodie: ['Pullover', 'Zip-up', 'Sleeveless', 'Longline', 'Crop', 'Graphic', 'Athletic', 'Fleece', 'Oversized'],
    Jacket: ['Bomber', 'Denim', 'Leather', 'Blazer', 'Trench', 'Peacoat', 'Windbreaker', 'Puffer', 'Parka', 'Anorak'],
    Coat: ['Overcoat', 'Trench coat', 'Peacoat', 'Duffle coat', 'Parka', 'Cape coat', 'Wrap coat', 'Raincoat', 'Chesterfield'],
    Pants: ['Jeans', 'Chinos', 'Cargo', 'Sweatpants', 'Leggings', 'Palazzo', 'Culottes', 'Dress pants', 'Joggers', 'Corduroy'],
    Skirt: ['A-line', 'Pencil', 'Maxi', 'Mini', 'Midi', 'Pleated', 'Wrap', 'Asymmetrical', 'Tulle', 'Circle'],
    Dress: ['A-line', 'Ball gown', 'Sheath', 'Shift', 'Wrap', 'Maxi', 'Midi', 'Mini', 'Bodycon', 'Empire waist'],
    Shoes: ['Boots', 'Sandals', 'Sneakers', 'Heels', 'Flats', 'Loafers', 'Slippers', 'Wedges', 'Espadrilles', 'Mules'],
    Underwear: ['Briefs', 'Boxers', 'Trunks', 'Bikini', 'Thong', 'Boyshorts', 'Hipsters', 'Bras', 'Sports bras', 'Camisoles'],
    Accessories: ['Scarf', 'Gloves', 'Hat', 'Cap', 'Beanie', 'Belt', 'Tie', 'Sunglasses', 'Watch', 'Jewelry']
};


// Clothing colors data
const clothingColors = ['Black', 'White', 'Grey', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple'];

// Skin tone colors
const skinTones =  [
  '#FFDFC4', // Fair (Ivory)
  '#F0D5BE', // Fair (Warm)
  '#E1B899', // Light (Beige)
  '#E5C298', // Light (Warm Beige)
  '#D1A384', // Medium Light
  '#BB8B75', // Medium
  '#A66A4C', // Medium Dark
  '#8C4A30', // Olive
  '#6F4F28', // Tan
  '#5B3833', // Dark Brown
  '#432820', // Deep Dark Brown
  '#29211F', // Very Dark
];


export default function RecommendationForm() {
  const [formData, setFormData] = useState({
    event: events[0],
    gender: genders[0],
    complexion: '#deb887',  // Default to a mid-tone
    country: countries[0],
    clothes: []
  });

  const [currentClothingItem, setCurrentClothingItem] = useState(clothingItems[0]);
  const [currentClothingType, setCurrentClothingType] = useState(clothingTypes[clothingItems[0]][0]);
  const [currentClothingColor, setCurrentClothingColor] = useState(clothingColors[0]);
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeSection, setActiveSection] = useState('personal'); // 'personal' or 'clothing'
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplexionChange = (color) => {
    setFormData({
      ...formData,
      complexion: color.hex
    });
  };

  const handleClothingColorChange = (color) => {
    setCurrentClothingColor(color.hex);
  };

  const addClothingItem = () => {
    setFormData({
      ...formData,
      clothes: [...formData.clothes, { 
        id: Date.now(), // Unique ID for animation keys
        item: currentClothingItem, 
        type: currentClothingType, 
        color: currentClothingColor 
      }]
    });
    // Auto-close color picker after adding
    setShowColorPicker(false);
  };

  const removeClothingItem = (id) => {
    setFormData({
      ...formData,
      clothes: formData.clothes.filter(item => item.id !== id)
    });
  };

  const apiUrl = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL_LOCAL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.clothes.length < 3) {
      setError('Please add at least 3 clothing items.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/recommend`, formData);
      setRecommendation(response.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setError('Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateClothingType = (item) => {
    setCurrentClothingType(clothingTypes[item][0]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto rounded-xl overflow-hidden bg-white shadow-xl"
    >
      <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="bg-white p-6 sm:p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Style Recommendation</h2>
          
          {/* Navigation Tabs */}
          <div className="flex mb-8 border-b">
            <button
              onClick={() => setActiveSection('personal')}
              className={`flex-1 py-3 font-medium text-sm ${
                activeSection === 'personal'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveSection('clothing')}
              className={`flex-1 py-3 font-medium text-sm ${
                activeSection === 'clothing'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Clothing Selection
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            {activeSection === 'personal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Gender */}
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex space-x-4">
                    {genders.map((gender) => (
                      <motion.div
                        key={gender}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, gender })}
                        className={`flex-1 cursor-pointer rounded-lg p-3 text-center ${
                          formData.gender === gender
                            ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
                            : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {gender}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Event */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <Listbox value={formData.event} onChange={(event) => setFormData({ ...formData, event })}>
                    {({ open }) => (
                      <>
                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <span className="block truncate">{formData.event}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {events.map((event) => (
                                <Listbox.Option
                                  key={event}
                                  className={({ active }) =>
                                    `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={event}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {event}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </motion.div>

                {/* Skin Complexion */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skin Complexion</label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skinTones.map((color) => (
                      <motion.div
                        key={color}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-full cursor-pointer transition-transform ${
                          formData.complexion === color ? 'ring-4 ring-indigo-500' : 'ring-1 ring-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleComplexionChange({ hex: color })}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: formData.complexion }}
                    >
                      <span className="text-xs font-semibold text-white text-shadow">Selected</span>
                    </div>
                  </div>
                </motion.div>

                {/* Country of Origin */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</label>
                  <Listbox value={formData.country} onChange={(country) => setFormData({ ...formData, country })}>
                    {({ open }) => (
                      <>
                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <span className="block truncate">{formData.country}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {countries.map((country) => (
                                <Listbox.Option
                                  key={country}
                                  className={({ active }) =>
                                    `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={country}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {country}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4 flex justify-between">
                  <div />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setActiveSection('clothing')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next: Select Clothing
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Clothing Selection Section */}
            {activeSection === 'clothing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Added Clothes List */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Your Selected Items</h3>
                  {formData.clothes.length === 0 ? (
                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                      No clothing items added yet. Add some items below.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      <AnimatePresence>
                        {formData.clothes.map((clothing) => (
                          <motion.li
                            key={clothing.id}
                            variants={listItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center justify-between p-3 bg-white shadow-sm border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-8 h-8 rounded-full flex-shrink-0"
                                style={{ backgroundColor: clothing.color }}
                              />
                              <span>
                                <span className="font-medium">{clothing.item}</span>
                                <span className="text-gray-500"> - {clothing.type}</span>
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => removeClothingItem(clothing.id)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </motion.button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {/* Add New Clothing Item */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Clothing Item */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
                      <Listbox value={currentClothingItem} onChange={(item) => { setCurrentClothingItem(item); updateClothingType(item); }}>
                        {({ open }) => (
                          <>
                            <div className="relative">
                              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                <span className="block truncate">{currentClothingItem}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                show={open}
                                as={React.Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                  {clothingItems.map((item) => (
                                    <Listbox.Option
                                      key={item}
                                      className={({ active }) =>
                                        `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                      }
                                      value={item}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                            {item}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`${active ? 'text-white' : 'text-indigo-600'}
                                              absolute inset-y-0 right-0 flex items-center pr-4`}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>

                    {/* Clothing Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                      <Listbox value={currentClothingType} onChange={setCurrentClothingType}>
                        {({ open }) => (
                          <>
                            <div className="relative">
                              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                <span className="block truncate">{currentClothingType}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                show={open}
                                as={React.Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                  {clothingTypes[currentClothingItem].map((type) => (
                                    <Listbox.Option
                                      key={type}
                                      className={({ active }) =>
                                        `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                      }
                                      value={type}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                            {type}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`${active ? 'text-white' : 'text-indigo-600'}
                                              absolute inset-y-0 right-0 flex items-center pr-4`}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>

                  {/* Clothing Color */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex space-x-3 items-center">
                        <div 
                          className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                          style={{ backgroundColor: currentClothingColor }}
                          onClick={() => setShowColorPicker(!showColorPicker)}
                        />
                        <span className="text-sm font-medium">
                          Selected Color
                        </span>
                      </div>
                      
                      {showColorPicker ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="relative z-10"
                        >
                          <div 
                            className="fixed inset-0" 
                            onClick={() => setShowColorPicker(false)}
                          />
                          <div className="absolute">
                            <SketchPicker
                              color={currentClothingColor}
                              onChangeComplete={handleClothingColorChange}
                              disableAlpha
                            />
                          </div>
                        </motion.div>
                      ) : null}
                      
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {clothingColors.map(color => (
                          <motion.div
                            key={color}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-8 h-8 rounded-full cursor-pointer ${
                              currentClothingColor === color ? 'ring-2 ring-indigo-600' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentClothingColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add Button */}
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={addClothingItem}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Add This Item
                    </motion.button>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setActiveSection('personal')}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back to Personal Info
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
                      ${formData.clothes.length >= 3 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    disabled={formData.clothes.length < 3}
                  >
                    Get Recommendation
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-8 flex flex-col items-center justify-center">
              <ClipLoader color="#4f46e5" size={50} />
              <p className="mt-4 text-gray-600">Generating your personalized style recommendation...</p>
            </div>
          )}

          {/* Recommendation Result */}
          <AnimatePresence>
            {recommendation && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100"
              >
                <h2 className="text-xl font-bold text-indigo-800 mb-4">Your Style Recommendation</h2>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Perfect Outfit</h3>
                    <p className="mt-2 text-gray-700">{recommendation.outfit}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Alternative Options</h3>
                    <p className="mt-2 text-gray-700">{recommendation.alternatives}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-gray-900">Stylist's Note</h3>
                    <p className="mt-2 text-gray-700">{recommendation.message}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setRecommendation(null);
                      setFormData({
                        ...formData,
                        clothes: []
                      });
                      setActiveSection('personal');
                    }}
                    className="px-5 py-2 border border-indigo-300 text-indigo-700 bg-white rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Start Over
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
