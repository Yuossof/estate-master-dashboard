/* eslint-disable react/prop-types */
import React from 'react'

const Line = ({ spaceY = 0, spaceX = 0, spaceT = 0, spaceB = 0 }) => {
  return (
    <div
      className="h-[1px] w-full dark:bg-slate-600 bg-slate-200"
      style={{
        marginTop: spaceT,
        marginBottom: spaceB,
        marginLeft: spaceX,
        marginRight: spaceX,
        marginBlock: spaceY,
      }}
    />
  )
}

export default Line
