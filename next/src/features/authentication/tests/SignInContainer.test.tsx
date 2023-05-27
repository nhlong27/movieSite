import { describe, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthPage from '@/pages/AuthPage';
import { useNavigate } from 'react-router-dom';
import SignInContainer from '../components/SignInContainer';

describe('AuthPage - Component Test', () => {
  test('renders the sign-in container by default', () => {
    render(<AuthPage />);
    const signInContainer = screen.getByTestId('sign-in-container');
    expect(signInContainer).toBeInTheDocument();
  });

  // test('renders sign-in form and handles sign-in mutation', () => {
  //   const mockNavigate = jest.fn();
  //   jest.mock('react-router-dom', () => ({
  //     ...(jest.requireActual('react-router-dom') as any),
  //     useNavigate: () => mockNavigate,
  //   }));

  //   render(<SignInContainer setShouldSignInDisplay={jest.fn()} />);

  //   const signInHeading = screen.getByText('Sign In to Fir Media');
  //   expect(signInHeading).toBeInTheDocument();

  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const signInButton = screen.getByText('Sign In');
  //   expect(emailInput).toBeInTheDocument();
  //   expect(passwordInput).toBeInTheDocument();
  //   expect(signInButton).toBeInTheDocument();


  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //   fireEvent.click(signInButton);

  // });
});
