import React, { useState } from 'react';
import '../components/styles/searchAndFilter.css'; // Import the CSS file
import axios from 'axios';

const SearchAndFilter = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [adddinning, setAdddinning] = useState(false);
    const [addCar, setAddCar] = useState(false);
    const [showdinningOptions, setShowdinningOptions] = useState(false);
    const [showCarOptions, setShowCarOptions] = useState(false);
    const [showPackageOptions, setShowPackageOptions] = useState(false);
    const [showThingsToDoOptions, setShowThingsToDoOptions] = useState(false);
    const [accommodationType, setAccommodationType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleServiceSelection = (service) => {
        setShowdinningOptions(false);
        setShowCarOptions(false);
        setShowPackageOptions(false);
        setShowThingsToDoOptions(false);

        switch (service) {
            case 'dinnings':
                setShowdinningOptions(true);
                break;
            case 'cars':
                setShowCarOptions(true);
                break;
            case 'packages':
                setShowPackageOptions(true);
                break;
            case 'thingsToDo':
                setShowThingsToDoOptions(true);
                break;
            default:
                break;
        }
    };

    const handleSearch = async () => {
        if (!showdinningOptions && !showCarOptions && !showPackageOptions && !showThingsToDoOptions) {
            try {
                setLoading(true);
                const response = await axios.get('/search/filter/Accomadation', {
                    location: location,
                    accommodationType: accommodationType,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });
                setSearchResults(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error('Error searching hotels:', error);
                setLoading(false);
            }
        }
        else if (showdinningOptions) {
            try {
                setLoading(true);
                const response = await axios.get('/search/filter/Dinning', {
                    name: name,
                    cuisineType: cuisineType,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });

                setSearchResults(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error('Error searching hotels:', error);
                setLoading(false);
            }
        }
        else if (showCarOptions) {
            try {
                setLoading(true);
                const response = await axios.get('/search/transportation', {
                    currentLocation: location,
                    destination: destination
                });

                setSearchResults(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error('Error searching hotels:', error);
                setLoading(false);
            }
        }
        else if (showPackageOptions) {
            try {
                setLoading(true);
                const response = await axios.get('/search/packages', {
                    destination: destination,
                    startDate: startDate,
                    endDate: endDate,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });

                setSearchResults(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error('Error searching Packages:', error);
                setLoading(false);
            }
        }
        else if (showThingsToDoOptions) {
            try {
                setLoading(true);
                const response = await axios.get('/search/things-to-do', {
                    location: location,
                    category: category,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });

                setSearchResults(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (error) {
                console.error('Error searching thingstodo:', error);
                setLoading(false);
            }
        }
    };

    return (
        <div className="search-container">
            <div className="service-buttons">
                <button onClick={() => handleServiceSelection('stays')}>Stays</button>
                <button onClick={() => handleServiceSelection('dinnings')}>dinnings</button>
                <button onClick={() => handleServiceSelection('cars')}>Cars</button>
                <button onClick={() => handleServiceSelection('packages')}>Packages</button>
                <button onClick={() => handleServiceSelection('thingsToDo')}>Things to Do</button>
            </div>
            <div className="search-inputs">
                {!showdinningOptions && !showCarOptions && !showPackageOptions && !showThingsToDoOptions && (
                    <>
                        <input type="text" placeholder="Going to" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <input type="text" placeholder="Accommodation Type" value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} />
                        <input type="text" placeholder='Minimun Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <input type="text" placeholder='Maximum Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </>
                )}
                {showdinningOptions && (
                    <>
                        <div>
                            <div style={{ display: "flex" }}>
                                <input type="text" placeholder="cuisineType" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
                                <input type="text" placeholder='Minimun Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                <input type="text" placeholder='Maximum Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            </div>
                        </div>

                    </>
                )}
                {showPackageOptions && (
                    <>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                                <input type="date" placeholder="StartDate" value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
                                <input type="date" placeholder="EndDate" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
                                <input type="text" placeholder='Minimun Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                <input type="text" placeholder='Maximum Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            </div>

                        </div>


                    </>
                )}
                {showCarOptions && (
                    <>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <input type="text" placeholder="Current Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                            </div>
                        </div>


                    </>
                )}
                {showThingsToDoOptions && (
                    <>
                        <input type="text" placeholder="Where ?" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option>Category</option>
                            <option>HighLand</option>
                            <option>RiftVally</option>
                            <option>GameZone</option>
                            <option>Gliding</option>
                        </select>
                        <input type="text" placeholder='Minimun Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <input type="text" placeholder='Maximum Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </>
                )}
            </div>
            <div className="search-inputs">
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="add-options">
                <label>
                    <input type="checkbox" checked={adddinning} onChange={() => setAdddinning(!adddinning)} />
                    Add a dinning
                </label>
                <label>
                    <input type="checkbox" checked={addCar} onChange={() => setAddCar(!addCar)} />
                    Add a car
                </label>
            </div>
        </div>
    );
};

export default SearchAndFilter;
