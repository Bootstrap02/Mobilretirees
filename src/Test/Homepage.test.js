// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import axios from 'axios';
// import Homepage from '../Pages/Firstpage'; // Fixed to match your file name/path

// // Mock axios globally
// jest.mock('axios');

// // Mock react-router-dom's useNavigate
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// // Mock localStorage
// const mockLocalStorage = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
// };
// Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// // Improved Mock for IntersectionObserver (simulates full lifecycle)
// // global.IntersectionObserver = jest.fn((callback, options) => ({
// //   root: null,
// //   rootMargin: '',
// //   thresholds: [],
// //   observe: jest.fn((el) => {
// //     // Simulate intersection for tests (calls callback with fake entry)
// //     callback([{ isIntersecting: true, target: el }], this);
// //   }),
// //   unobserve: jest.fn(),
// //   disconnect: jest.fn(),
// // }));
// global.IntersectionObserver = jest.fn((callback, options) => ({
//   root: null,
//   rootMargin: '',
//   thresholds: [],
//   observe: jest.fn((el) => {
//     callback([{ isIntersecting: true, target: el }], this);
//   }),
//   unobserve: jest.fn(),
//   disconnect: jest.fn(),
// }));
// // Wrap in Router
// const renderComponent = () => render(
//   <MemoryRouter>
//     <Homepage />
//   </MemoryRouter>
// );

// // Setup defaults before each test
// beforeEach(() => {
//   // Default no user
//   mockLocalStorage.getItem.mockReturnValue(null);
//   // Default empty API responses to avoid logs/errors
//   axios.get.mockResolvedValue({ data: {} });
// });

// test('renders Homepage without crashing and shows hero section', () => {
//   renderComponent();
//   expect(screen.getByText(/Welcome Home,/i)).toBeInTheDocument();
//   expect(screen.getByText('Our Core Pillars')).toBeInTheDocument();
//   expect(screen.getByText('Officially Registered & Trusted')).toBeInTheDocument();
// });

// test('shows dashboard button when user is logged in', () => {
//   mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ user: { role: 'member' } })); // Fake user
//   renderComponent();
//   expect(screen.getByText('Go to My Dashboard')).toBeInTheDocument();
//   expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
// });

// test('shows signin and signup buttons when user is not logged in', () => {
//   mockLocalStorage.getItem.mockReturnValue(null);
//   renderComponent();
//   expect(screen.getByText('Sign In')).toBeInTheDocument();
//   expect(screen.getByText('Create Account')).toBeInTheDocument();
//   expect(screen.queryByText('Go to My Dashboard')).not.toBeInTheDocument();
// });

// test('shows "No Recent News" when there is no featured news', async () => {
//   axios.get.mockResolvedValueOnce({ data: { newsEvent: [] } }); // News empty
//   renderComponent();
//   await waitFor(() => {
//     expect(screen.getByText('No Recent News')).toBeInTheDocument();
//   });
// });

// test('opens and closes notifications', async () => {
//   renderComponent();
//   // Add aria-label="Notifications" to Header <button onClick={isOpen}> for this query
//   const notificationsButton = screen.getByRole('button', { name: /notifications/i }); // Adjust if added
//   await userEvent.click(notificationsButton);
//   // Assume NotificationsList has unique text; replace with actual (e.g., from component)
//   expect(screen.getByText(/Notifications/i)).toBeInTheDocument(); 

//   // For close: If close button in list, query and click
//   // const closeButton = screen.getByRole('button', { name: /close/i });
//   // await userEvent.click(closeButton);
//   // expect(screen.queryByText(/Notifications/i)).not.toBeInTheDocument();
// });

// test('fetches and renders featured news on load', async () => {
//   const mockNews = [{ title: 'Test News', body: 'Test body', image: ['test.jpg'] }];
//   axios.get.mockResolvedValueOnce({ data: { newsEvent: mockNews } }); // News
//   renderComponent();
//   await waitFor(() => {
//     expect(screen.getByText('Test News')).toBeInTheDocument();
//     expect(screen.getByText('Test body')).toBeInTheDocument();
//   });
// });

// test('handles API fetch errors without crashing', async () => {
//   axios.get.mockRejectedValue(new Error('Fetch error'));
//   renderComponent();
//   await waitFor(() => {
//     expect(screen.getByText('No Recent News')).toBeInTheDocument();
//   });
// });

// test('navigates to dashboard on button click when logged in', () => {
//   const mockNavigate = jest.fn();
//   jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
//   mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ user: { role: 'member' } }));
//   renderComponent();
//   userEvent.click(screen.getByText('Go to My Dashboard'));
//   expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
// });
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Homepage from '../Pages/Firstpage';

// --------------------
// Global Mocks
// --------------------

jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// --------------------
// Helper Render
// --------------------

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );

// --------------------
// Default Setup
// --------------------

beforeEach(() => {
  jest.clearAllMocks();

  // Default: user not logged in
  mockLocalStorage.getItem.mockReturnValue(null);

  // Default: no news
  axios.get.mockResolvedValue({
    data: { newsEvent: [] },
  });
});

// =====================================================
// TESTS
// =====================================================

describe('Homepage Component', () => {

  // --------------------
  // Static Rendering
  // --------------------

  test('renders hero section and static content', () => {
    renderComponent();

    expect(screen.getByText(/Welcome Home,/i)).toBeInTheDocument();
    expect(screen.getByText('Our Core Pillars')).toBeInTheDocument();
    expect(screen.getByText('Officially Registered & Trusted')).toBeInTheDocument();
  });

  // --------------------
  // Authentication Logic
  // --------------------

  test('shows dashboard button when user is logged in', () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ user: { role: 'member' } })
    );

    renderComponent();

    expect(screen.getByText('Go to My Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  test('shows Sign In and Create Account when user is not logged in', () => {
    renderComponent();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.queryByText('Go to My Dashboard')).not.toBeInTheDocument();
  });

  // --------------------
  // News Fetching
  // --------------------

  test('fetches featured news on load', async () => {
    const mockNews = [
      {
        title: 'Test News',
        body: 'Test body',
        image: ['test.jpg'],
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { newsEvent: mockNews },
    });

    renderComponent();

    expect(axios.get).toHaveBeenCalled();

    expect(await screen.findByText('Test News')).toBeInTheDocument();
    expect(screen.getByText('Test body')).toBeInTheDocument();
  });

  test('shows "No Recent News" when news list is empty', async () => {
    axios.get.mockResolvedValueOnce({
      data: { newsEvent: [] },
    });

    renderComponent();

    expect(await screen.findByText('No Recent News')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch error'));

    renderComponent();

    expect(await screen.findByText('No Recent News')).toBeInTheDocument();
  });

  // --------------------
  // Notifications Toggle
  // --------------------

  test('opens notifications when clicking notification button', async () => {
    renderComponent();

    const notificationButton = screen.getByRole('button', {
      name: /notifications/i,
    });

    await userEvent.click(notificationButton);

    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  // --------------------
  // Navigation
  // --------------------

  test('navigates to dashboard when dashboard button is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ user: { role: 'member' } })
    );

    renderComponent();

    const dashboardButton = screen.getByText('Go to My Dashboard');

    await userEvent.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

});