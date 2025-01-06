import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button"; 
type ButtonGroupProps = {
  buttons: string[];
  onButtonClick?: (index: number) => void;
};

const IndicatorButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, onButtonClick }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: '0px',
    left: '0px',
  });

  useEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      if (container) {
        const buttons = container.querySelectorAll('button');
        const activeButton = buttons[activeIndex] as HTMLButtonElement;

        if (activeButton) {
          const buttonWidth = activeButton.offsetWidth;
          const buttonLeft = activeButton.offsetLeft;
          setIndicatorStyle({
            width: `${buttonWidth}px`,
            left: `${buttonLeft}px`,
          });
        }
      }
    };

    updateIndicator();
  }, [activeIndex]);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    if (onButtonClick) {
      onButtonClick(index);
    }
  };

  return (
    <div className="flex relative h-[32px] xl:h-[44px] w-[1085px] gap-x-8 xl:gap-x-14" ref={containerRef}>
      {buttons.map((label, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`pl-0 pb-6 font-Inter xl:font-poppins text-[13px] xl:text-[16px] leading-[19.5px] xl:leading-[24px] text-textDark
          }`}
          onClick={() => handleButtonClick(index)}
        >
          {label}
        </Button>
      ))}
      <div className="absolute bottom-0 bg-white h-[4px] w-[390px] xl:w-full"></div>
        <div 
            className="absolute bottom-0 h-[4px] w-full"        
            style={indicatorStyle}
        >
            <div className="relative bottom-0 h-1 w-[64px] bg-primary mx-auto"></div>
            </div>
        </div>
  );
};

export default IndicatorButtonGroup;
