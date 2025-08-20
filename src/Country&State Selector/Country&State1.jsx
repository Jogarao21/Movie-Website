import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const CountryStateSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');

  const countryStateData = {
    'United States': [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    'Canada': [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
      'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
      'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
    ],
    'India': [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
      'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar Islands'
    ],
    'Australia': [
      'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
      'South Australia', 'Tasmania', 'Northern Territory',
      'Australian Capital Territory'
    ],
    'Brazil': [
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
      'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
      'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
      'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
      'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ],
    'Germany': [
      'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen',
      'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern',
      'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland',
      'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    'Mexico': [
      'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
      'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
      'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City', 'Mexico State',
      'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
      'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
      'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
    ],
    'United Kingdom': [
      'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    'China': [
      'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong',
      'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan',
      'Hong Kong', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi',
      'Jilin', 'Liaoning', 'Macau', 'Ningxia', 'Qinghai', 'Shaanxi',
      'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet',
      'Xinjiang', 'Yunnan', 'Zhejiang'
    ],
    'Russia': [
      'Adygea', 'Altai Krai', 'Altai Republic', 'Amur Oblast', 'Arkhangelsk Oblast',
      'Astrakhan Oblast', 'Bashkortostan', 'Belgorod Oblast', 'Bryansk Oblast',
      'Buryatia', 'Chechen Republic', 'Chelyabinsk Oblast', 'Chukotka',
      'Chuvashia', 'Dagestan', 'Ingushetia', 'Irkutsk Oblast', 'Ivanovo Oblast',
      'Kabardino-Balkaria', 'Kaliningrad Oblast', 'Kalmykia', 'Kaluga Oblast',
      'Kamchatka Krai', 'Karachay-Cherkessia', 'Karelia', 'Kemerovo Oblast',
      'Khabarovsk Krai', 'Khakassia', 'Khanty-Mansi', 'Kirov Oblast',
      'Komi Republic', 'Kostroma Oblast', 'Krasnodar Krai', 'Krasnoyarsk Krai',
      'Kurgan Oblast', 'Kursk Oblast', 'Leningrad Oblast', 'Lipetsk Oblast',
      'Magadan Oblast', 'Mari El', 'Mordovia', 'Moscow', 'Moscow Oblast',
      'Murmansk Oblast', 'Nenets', 'Nizhny Novgorod Oblast', 'North Ossetia',
      'Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast',
      'Oryol Oblast', 'Penza Oblast', 'Perm Krai', 'Primorsky Krai',
      'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast', 'Saint Petersburg',
      'Sakha Republic', 'Sakhalin Oblast', 'Samara Oblast', 'Saratov Oblast',
      'Smolensk Oblast', 'Stavropol Krai', 'Sverdlovsk Oblast', 'Tambov Oblast',
      'Tatarstan', 'Tomsk Oblast', 'Tula Oblast', 'Tuva', 'Tver Oblast',
      'Tyumen Oblast', 'Udmurtia', 'Ulyanovsk Oblast', 'Vladimir Oblast',
      'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Yamalo-Nenets',
      'Yaroslavl Oblast', 'Zabaykalsky Krai'
    ],
    'Japan': [
      'Aichi', 'Akita', 'Aomori', 'Chiba', 'Ehime', 'Fukui', 'Fukuoka',
      'Fukushima', 'Gifu', 'Gunma', 'Hiroshima', 'Hokkaido', 'Hyogo',
      'Ibaraki', 'Ishikawa', 'Iwate', 'Kagawa', 'Kagoshima', 'Kanagawa',
      'Kochi', 'Kumamoto', 'Kyoto', 'Mie', 'Miyagi', 'Miyazaki', 'Nagano',
      'Nagasaki', 'Nara', 'Niigata', 'Oita', 'Okayama', 'Okinawa', 'Osaka',
      'Saga', 'Saitama', 'Shiga', 'Shimane', 'Shizuoka', 'Tochigi', 'Tokushima',
      'Tokyo', 'Tottori', 'Toyama', 'Wakayama', 'Yamagata', 'Yamaguchi', 'Yamanashi'
    ],
    'France': [
      'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany',
      'Centre-Val de Loire', 'Corsica', 'Grand Est', 'Hauts-de-France',
      'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine', 'Occitanie',
      'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'
    ],
    'Italy': [
      'Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata', 'Calabria', 'Campania',
      'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy',
      'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Trentino-Alto Adige',
      'Tuscany', 'Umbria', 'Veneto'
    ],
    'Spain': [
      'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country',
      'Canary Islands', 'Cantabria', 'Castile and León', 'Castile-La Mancha',
      'Catalonia', 'Ceuta', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid',
      'Melilla', 'Murcia', 'Navarre', 'Valencia'
    ]
  };

  const countries = Object.keys(countryStateData);

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter states based on search
  const filteredStates = selectedCountry 
    ? countryStateData[selectedCountry].filter(state =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
      )
    : [];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setCountrySearch('');
    setStateSearch('');
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '32px',
      textAlign: 'center'
    },
    dropdownSection: {
      marginBottom: '32px'
    },
    label: {
      display: 'block',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '12px'
    },
    dropdownContainer: {
      position: 'relative'
    },
    dropdownButton: {
      width: '100%',
      maxWidth: '384px',
      backgroundColor: 'white',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 16px',
      textAlign: 'left',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease'
    },
    dropdownButtonHover: {
      borderColor: '#9ca3af'
    },
    dropdownButtonFocus: {
      borderColor: '#3b82f6'
    },
    dropdownButtonText: {
      color: '#1f2937'
    },
    dropdownButtonPlaceholder: {
      color: '#6b7280'
    },
    dropdownMenu: {
      position: 'absolute',
      zIndex: 10,
      width: '100%',
      maxWidth: '384px',
      marginTop: '4px',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      maxHeight: '320px',
      overflow: 'hidden'
    },
    searchContainer: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb'
    },
    searchInputContainer: {
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      color: '#9ca3af'
    },
    searchInput: {
      width: '100%',
      paddingLeft: '40px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      outline: 'none',
      fontSize: '14px'
    },
    searchInputFocus: {
      borderColor: '#3b82f6'
    },
    dropdownList: {
      maxHeight: '240px',
      overflowY: 'auto'
    },
    dropdownItem: {
      width: '100%',
      padding: '12px 16px',
      textAlign: 'left',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '1px solid #f3f4f6',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      outline: 'none'
    },
    dropdownItemHover: {
      backgroundColor: '#eff6ff'
    },
    dropdownItemLast: {
      borderBottom: 'none'
    },
    noResults: {
      padding: '12px 16px',
      textAlign: 'center',
      color: '#6b7280'
    },
    statesSection: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '24px'
    },
    statesHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '24px',
      gap: '16px'
    },
    statesHeaderResponsive: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0'
    },
    statesTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0'
    },
    stateSearchContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '320px'
    },
    statesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '12px'
    },
    stateCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    stateCardHover: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderColor: '#93c5fd'
    },
    stateText: {
      color: '#374151',
      fontWeight: '500'
    },
    statesCount: {
      marginTop: '16px',
      fontSize: '14px',
      color: '#6b7280'
    },
    noStatesFound: {
      textAlign: 'center',
      padding: '32px 0'
    },
    noStatesText: {
      color: '#6b7280',
      fontSize: '1.125rem'
    },
    clearButton: {
      marginTop: '8px',
      color: '#3b82f6',
      textDecoration: 'underline',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px'
    },
    clearButtonHover: {
      color: '#1d4ed8'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Country & State Selector
      </h1>
      
      {/* Country Dropdown */}
      <div style={styles.dropdownSection}>
        <label style={styles.label}>
          Select a Country:
        </label>
        <div style={styles.dropdownContainer}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              ...styles.dropdownButton,
              ...(selectedCountry ? {} : {})
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = styles.dropdownButtonHover.borderColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#d1d5db';
            }}
            onFocus={(e) => {
              e.target.style.borderColor = styles.dropdownButtonFocus.borderColor;
            }}
          >
            <span style={selectedCountry ? styles.dropdownButtonText : styles.dropdownButtonPlaceholder}>
              {selectedCountry || 'Choose a country...'}
            </span>
            <ChevronDown 
              style={{
                width: '20px',
                height: '20px',
                color: '#6b7280',
                transition: 'transform 0.2s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          {isOpen && (
            <div style={styles.dropdownMenu}>
              {/* Country Search Input */}
              <div style={styles.searchContainer}>
                <div style={styles.searchInputContainer}>
                  <Search style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    style={styles.searchInput}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => {
                      e.target.style.borderColor = styles.searchInputFocus.borderColor;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  />
                </div>
              </div>
              
              {/* Country List */}
              <div style={styles.dropdownList}>
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <button
                      key={country}
                      onClick={() => handleCountrySelect(country)}
                      style={{
                        ...styles.dropdownItem,
                        ...(index === filteredCountries.length - 1 ? styles.dropdownItemLast : {})
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {country}
                    </button>
                  ))
                ) : (
                  <div style={styles.noResults}>
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* States Display */}
      {selectedCountry && (
        <div style={styles.statesSection}>
          <div style={{
            ...styles.statesHeader,
            ...(window.innerWidth >= 640 ? styles.statesHeaderResponsive : {})
          }}>
            <h2 style={styles.statesTitle}>
              States/Provinces in {selectedCountry}
            </h2>
            
            {/* State Search Input */}
            <div style={styles.stateSearchContainer}>
              <Search style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search states/provinces..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => {
                  e.target.style.borderColor = styles.searchInputFocus.borderColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>
          </div>
          
          {filteredStates.length > 0 ? (
            <>
              <div style={styles.statesGrid}>
                {filteredStates.map((state, index) => (
                  <div
                    key={index}
                    style={styles.stateCard}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = styles.stateCardHover.boxShadow;
                      e.target.style.borderColor = styles.stateCardHover.borderColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <span style={styles.stateText}>{state}</span>
                  </div>
                ))}
              </div>
              <div style={styles.statesCount}>
                Showing {filteredStates.length} of {countryStateData[selectedCountry].length} states/provinces
                {stateSearch && ` for "${stateSearch}"`}
              </div>
            </>
          ) : (
            <div style={styles.noStatesFound}>
              <div style={styles.noStatesText}>
                {stateSearch ? `No states found for "${stateSearch}"` : 'No states available'}
              </div>
              {stateSearch && (
                <button
                  onClick={() => setStateSearch('')}
                  style={styles.clearButton}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.clearButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#3b82f6';
                  }}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryStateSelector;