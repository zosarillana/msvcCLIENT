declare module 'jwt-decode' {
    function jwtDecode<T>(token: string): T;
    export default jwtDecode;
  }
  