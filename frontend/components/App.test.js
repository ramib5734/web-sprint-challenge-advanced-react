import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('sanity', () => {
  expect(true).toBe(true)
})

beforeEach(() => {
  render(<AppFunctional />);
});

test('header is rendering', () => {
  const heading = screen.queryByText("Coordinates (2, 2)")
  expect (heading).toBeVisible()
  expect (heading).toBeInTheDocument()
})