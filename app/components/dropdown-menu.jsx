import { useEffect, useState } from 'react';

const DropdownMenu = ({ captionSuiteValue, selectedStateValue }) => {
  const [selected, setSelected] = useState(captionSuiteValue[0].id);

  useEffect(() => {
    selectedStateValue(captionSuiteValue.find(value => value.id === selected));
  }, [selected, selectedStateValue, captionSuiteValue]);

  const handleChange = event => {
    setSelected(parseInt(event.target.value));
  };

  return (
    <div className='relative inline-block text-left w-72 ml-2.5'>
      <select
        value={selected}
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 '
      >
    {captionSuiteValue.map(value => (
      value.id === 0 ? (
        <option
          key={value.id}
          value={value.id}
          disabled
          selected
          className='text-sm text-slate-400 hover:bg-gray-100 rounded-md m-5'
        >
          {value.name}
        </option>
      ) : (
        <option
          key={value.id}
          value={value.id}
          className='text-sm text-gray-700 hover:bg-gray-100 rounded-md m-5'
        >
          {value.name}
        </option>
      )
    ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
