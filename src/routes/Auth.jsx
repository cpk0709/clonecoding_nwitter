const Auth = () => {
  return (
    <div>
      <form>
        <input type='text' placeholder='Email' required />
        <input type='password' placeholder='Password' required />
        <input type='submit' value='Log In' />
      </form>
      <div>
        <button>Contiune with Google</button>
        <button>Contiune with Github</button>
      </div>
    </div>
  );
};

export default Auth;
