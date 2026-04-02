import React from 'react'

const StrengthIndicator = ({ strength }) => {
    const colorMap = {
    Weak: "text-red-500",
    Medium: "text-yellow-500",
    Secure: "text-blue-500",
    "Very Secure": "text-green-600",
  };
  return (
    <p className={`font-semibold ${colorMap[strength]}`}>
      {strength}
    </p>
  )
}

export default StrengthIndicator