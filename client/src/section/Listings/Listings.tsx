import React from 'react';

interface Props {
  title: string;
}
export const Listings = ({ title }: Props) => {
  return <h1>{title}</h1>;
};
