import React, { useState } from 'react';
import axios from 'axios';
import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { SketchPicker } from 'react-color';

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

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

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
      clothes: [...formData.clothes, { item: currentClothingItem, type: currentClothingType, color: currentClothingColor }]
    });
  };

  const apiUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PRODUCTION
  : process.env.REACT_APP_API_URL_LOCAL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.clothes.length < 3) {
      alert('Please add at least 3 clothing items.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/recommend`, formData);
    setRecommendation(response.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateClothingType = (item) => {
    setCurrentClothingType(clothingTypes[item][0]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Event</label>
          <Listbox value={formData.event} onChange={(event) => setFormData({ ...formData, event })}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{formData.event}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
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
                </div>
              </>
            )}
          </Listbox>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <Listbox value={formData.gender} onChange={(gender) => setFormData({ ...formData, gender })}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{formData.gender}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {genders.map((gender) => (
                      <Listbox.Option
                        key={gender}
                        className={({ active }) =>
                          `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                        value={gender}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                              {gender}
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
                </div>
              </>
            )}
          </Listbox>
        </div>

        {/* Skin Complexion */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skin Complexion</label>
          <div className="flex space-x-3">
            {skinTones.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => handleComplexionChange({ hex: color })}
              ></div>
            ))}
          </div>
        </div>

        {/* Country of Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Country of Origin</label>
          <Listbox value={formData.country} onChange={(country) => setFormData({ ...formData, country })}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{formData.country}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
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
                </div>
              </>
            )}
          </Listbox>
        </div>

        {/* Your Clothes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Clothes</label>
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Clothing Item */}
              <Listbox value={currentClothingItem} onChange={(item) => { setCurrentClothingItem(item); updateClothingType(item); }}>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{currentClothingItem}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
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
                    </div>
                  </>
                )}
              </Listbox>

              {/* Clothing Type */}
              <Listbox value={currentClothingType} onChange={setCurrentClothingType}>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{currentClothingType}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
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
                    </div>
                  </>
                )}
              </Listbox>

              {/* Clothing Color */}
              <SketchPicker
                color={currentClothingColor}
                onChangeComplete={handleClothingColorChange}
              />

              {/* Add Clothing Item Button */}
              <button
                type="button"
                onClick={addClothingItem}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Clothing Item
              </button>
            </div>
          </div>
        </div>

        {/* Added Clothes List */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Added Clothes</label>
          <ul className="border border-gray-300 rounded-md divide-y divide-gray-300">
            {formData.clothes.map((clothing, index) => (
              <li key={index} className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-medium">{clothing.item}</span> - {clothing.type}
                </div>
                <div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: clothing.color }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Recommendation Button */}
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Recommendation
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading && <div className="mt-6 text-center">Loading...</div>}

      {/* Recommendation Result */}
      {recommendation && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Recommended Outfit:</h2>
          <div className="mt-2 text-gray-600">
            <p><strong>Outfit Recommendation:</strong> {recommendation.outfit}</p>
            <p><strong>Alternatives:</strong> {recommendation.alternatives}</p>
            <p><strong>Message:</strong> {recommendation.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
