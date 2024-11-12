import React, { useState } from 'react'
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc,doc, getDoc } from 'firebase/firestore';

function SignupSignin () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const navigate = useNavigate();

  function signupWithEmail () {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("user created ", user);
          toast.success("user created");
          setLoading(false);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('')
          createDoc(user);
          navigate('/dashboard');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
       });
      } else {
        toast.error("Passwords should match!")
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    };
  };

  function loginUsingEmail () {
    setLoading(true);
    if (email !== "" && password !== "") {
       signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
          const user = userCredential.user;
          toast.success("User Logged in");
          setLoading(false);
          navigate('/dashboard');
        // ...
  })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage)
      });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  async function createDoc (user) {
    setLoading(true);
    //make sure user with the uid does not exist
    // create a doc

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {  //creating doc only when the doc does not exist.
      try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name,
        email:user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
        setLoading(false);
    } catch (e) {
        toast.error(e.message);
        setLoading(false);
    }
    } else {
      toast.error('Doc exists already!')
      setLoading(false);
    };
  };

  function googleAuth () {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User", user);
        createDoc(user);
        setLoading(false);
        navigate('/dashboard')
        toast.success("User Authenticated");
        
    }).catch((error) => {
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
  });
    } catch (e) {
      setLoading(false);
      toast.error(e.message)
    }
  };


  return (
    <>
      {loginForm ?
        <>
          <div className='signup-wrapper'>
            <h2 className='title'>Login to  <span style={{ color: "var(--theme)" }}>FinTrack.</span></h2>
            <form>
              <Input type='email' label='Email' state={email} setState={setEmail} placeholder='johndoe@gmail.com' />
              <Input type='password' label='Password' state={password} setState={setPassword} placeholder='johndoe123' t />
              <Button text={loading ? "Loading..." : 'Login using Email and Password'} onClick={loginUsingEmail} disabled={loading} />
              <p className='p-login'>or</p>
              <Button onClick={googleAuth} text={loading ? "Loading..." : 'Login using Google'} blue={true} />
               <p className='p-login' onClick={()=>setLoginForm(!loginForm)}>or Don't Have an account ? Click Here</p>
            </form>
          </div>
        </>
        :
        <div className='signup-wrapper'>
          <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>FinTrack.</span></h2>
          <form>
            <Input label='Full Name' state={name} setState={setName} placeholder='John Doe' />
            <Input type='email' label='Email' state={email} setState={setEmail} placeholder='johndoe@gmail.com' />
            <Input type='password' label='Password' state={password} setState={setPassword} placeholder='johndoe123'  />
            <Input type='password' label='Confirm Password' state={confirmPassword} setState={setConfirmPassword} placeholder='johndoe123' />
            <Button text={loading ? "Loading..." : 'SignUp using Email and Password'} onClick={signupWithEmail} disabled={loading} />
            <p className='p-login'>or</p>
            <Button onClick={googleAuth} text={loading ? "Loading..." : 'SignUp using Google'} blue={true} />
             <p className='p-login' onClick={()=>setLoginForm(!loginForm)}> Have an account already ? Click Here</p>
          </form>
        </div>}
    </>
  );
};

export default SignupSignin;


//Doc is created at signup only.