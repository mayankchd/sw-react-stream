import React from 'react';

export default function DemoComponent(props, context) {
  return <div>{Array(10000).fill(1).map((i,j) => <div key={j}>{j}</div>)}</div>;
}

