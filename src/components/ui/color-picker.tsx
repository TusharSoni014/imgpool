"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [tempColor, setTempColor] = useState(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempColor(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[80px] h-[30px] p-0"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <div className="flex flex-col space-y-2">
          <div
            className="w-full h-[100px]"
            style={{ backgroundColor: tempColor }}
          />
          <Input
            type="color"
            value={tempColor}
            onChange={handleColorChange}
            className="w-full h-[40px]"
          />
          <Input
            type="text"
            value={tempColor}
            onChange={handleColorChange}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
