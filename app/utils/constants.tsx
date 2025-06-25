import { logout } from '../redux/reducers/userSlice';

export const MESSAGES = {
  loginSuccess: 'Login successful!',
  loginFailed: 'Login failed. Please try again.',
  networkError: 'Network error. Please check your internet connection.',
};

export const TITLES = {
  login: 'Đăng nhập',
  home: 'Home',
  profile: 'Profile',
  settings: 'Settings',
  accept: 'Xác nhận',
  cancel: 'Hủy bỏ',
  logout: 'Logout',
  menu: 'Menu',
  transaction: 'Transaction',
  report: 'Report',
  user: 'User',
};
export const ICONS = {
  back: require('../assets/icons/back-button.png'),
  show: require('../assets/icons/show_pass.png'),
  hide: require('../assets/icons/hide_pass.png'),
  clear: require('../assets/icons/clear.png'),
  setting: require('../assets/icons/settings.png'),
  info: require('../assets/icons/user.png'),
  scan: require('../assets/icons/scanner.png'),
  logout: require('../assets/icons/logout.png'),
};

export const IMAGES = {
  foxAI: require('../assets/images/company-logo.png'),
  avtar: require('../assets/images/avt_male.jpg'),
};
