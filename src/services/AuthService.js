
const AuthService = {
  isAuthenticated: false,
  user: null,

  setAuthentication(isAuthenticated, user) {
    this.isAuthenticated = isAuthenticated;
    this.user = user;
    localStorage.setItem('authState', JSON.stringify({ isAuthenticated, user }));
  },

  checkAuthentication() {
    const authState = JSON.parse(localStorage.getItem('authState'));
    if (authState) {
      this.isAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
    }
  },

  clearAuthentication() {
    localStorage.removeItem('authState');
    this.isAuthenticated = false;
    this.user = null;
  },
};

export default AuthService;
