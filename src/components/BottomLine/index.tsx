import React from "react";

interface Props {
  color?: string;
  width?: number;
  height?: number;
  spaceBottom?: number;
}

const BottomLine = ({ color, width, height, spaceBottom }: Props) => {

  const toPercent = (value: number | undefined, center = false) : string => {
    if (value && value > 0 && value <= 100) {
      return center ? 100-value+'%' : value+'%'
    }
    return '100%'
  }

  return (
    <div style={{
      position: 'absolute',
      background: color || '#dedede',
      width: toPercent(width),
      height: height || 0.5,
      right: `calc(${toPercent(width, true)} / 2)`,
      bottom: spaceBottom || 0
    }}/>
  )
}

export default React.memo(BottomLine)
