import { Tooltip } from 'react-tooltip';
import DropdownMenu from './dropdown-menu';

// Custom component for OptionSection
const OptionSection = ({ label, tooltipText, iconSVG, dropdownProps }) => (
  <div className='mb-1 relative'>
    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
      {label}
    </label>
    <div className='relative flex'>
      <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded'>
        <span id={`tooltip-target-${label.replace(/[^A-Z0-9]+/gi, '_')}`}>
          {iconSVG}
        </span>
        <Tooltip
          anchorSelect={`#tooltip-target-${label.replace(/[^A-Z0-9]+/gi, '_')}`}
          place='top'
          data-tooltip-variant='success'
        >
          {tooltipText}
        </Tooltip>
      </span>

      <div className='relative z-30'>
        <DropdownMenu {...dropdownProps} />
      </div>
    </div>
  </div>
);

export default OptionSection;
