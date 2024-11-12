import React, { useEffect } from 'react'
import './styles.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header () {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, loading])
  

  function logout(){
    try {
      signOut(auth).then(() => {
        toast.success("Logged Out Successfully")
        navigate('/');
      // Sign-out successful.
      }).catch((error) => {
        toast.error(error.message);
      // An error happened.
    });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className='navbar'>
      <p className='logo' onClick={()=>alert(`This does'nt work 🐱`)}>FINANCELY.</p>
      {user && <p className='logo link' onClick={logout}>LogOut</p>}
    </div>
  )
}

export default Header;