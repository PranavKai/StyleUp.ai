import React, { useState } from 'react';
import axios from 'axios';
import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { SketchPicker } from 'react-color';

const genders = ['Male', 'Female', 'Other'];
const events = ['Wedding', 'Party', 'Office', 'Meeting', 'Date', 'Outdoor', 'Casual Meet'];
const countries = ['USA', 'Canada', 'India', 'China', 'Japan', 'UK', 'Germany', 'France', 'Australia', 'Brazil']; // Add more as needed
const clothingItems = ['Jeans', 'Shirt', 'T-Shirt', 'Jacket', 'Dress', 'Skirt'];

const clothingTypes = {
  Jeans: ['Narrow', 'Slim', 'Regular', 'Bootcut'],
  Shirt: ['Formal', 'Casual'],
  'T-Shirt': ['V-Neck', 'Crew Neck', 'Polo'],
  Jacket: ['Blazer', 'Bomber', 'Denim'],
  Dress: ['Evening', 'Casual', 'Cocktail'],
  Skirt: ['Mini', 'Midi', 'Maxi']
};

const clothingColors = ['Black', 'White', 'Grey', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple'];

export default function RecommendationForm() {
  const [formData, setFormData] = useState({
    event: events[0],
    gender: genders[0],
    complexion: '#ffffff',  // Default to white
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://styleup-ai.onrender.com/', formData); // Use your actual backend URL
      setRecommendation(response.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Skin Complexion</label>
          <SketchPicker
            color={formData.complexion}
            onChangeComplete={handleComplexionChange}
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Clothes</label>
          <div className="space-y-4">
            <div className="space-y-2">
              <Listbox value={currentClothingItem} onChange={setCurrentClothingItem}>
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
              <SketchPicker
                color={currentClothingColor}
                onChangeComplete={handleClothingColorChange}
              />
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

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Recommendation
          </button>
        </div>
      </form>
      {loading && <div className="mt-6 text-center">Loading...</div>}
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
