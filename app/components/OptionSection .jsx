import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DropdownMenu from "./dropdown-menu";

// Custom component for OptionSection
const OptionSection = ({ label, tooltipText, iconSVG, dropdownProps }) => (
  <TooltipProvider>
    <div className="mb-1 relative">
      <label className="block mb-2 text-sm font-medium text-purple-900 dark:text-white">
        {label}
      </label>
      <div className="relative flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex items-center px-3 text-sm text-purple-900 bg-purple-200 border border-purple-300 rounded">
              {iconSVG}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>

        <div>
          <DropdownMenu {...dropdownProps} />
        </div>
      </div>
    </div>
  </TooltipProvider>
);

export default OptionSection;