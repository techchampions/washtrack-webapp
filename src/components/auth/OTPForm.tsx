import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CountdownTimer = ({ initialTime = 59, onExpire, }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-bold text-brand mb-2">
      {formatTime(timeLeft)}
    </div>
  );
};


const CodeInput = ({ value, onChange, length = 4 }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleInputChange = (index, inputValue) => {
    const newValue = value.split('');
    newValue[index] = inputValue;
    const updatedValue = newValue.join('');
    onChange(updatedValue);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  return (
    <div className="flex justify-center gap-3 mb-6">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setFocusedIndex(index)}
          className={`
            w-10 h-10 text-lg font-bold text-center rounded-2xl border-1
            focus:outline-none transition-all duration-200
            ${value[index]
              ? 'bg-brand text-white border-brand'
              : focusedIndex === index
                ? 'border-brand bg-white'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }
          `}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};


const Keypad = ({ onKeyPress }) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace']
  ];

  const handleKeyPress = (key) => {
    if (key === '') return;
    onKeyPress(key);
  };

  return (
    <div className="grid grid-cols-3 gap-y-0 w-3/4  gap-x-0 place-items-center mx-auto">
      {keys.flat().map((key, index) => {
        if (key === '') {
          return <div key={index} className="w-16 h-16 bg-white"></div>;
        }

        if (key === 'backspace') {
          return (
            <button
              key={index}
              onClick={() => handleKeyPress(key)}
              className="w-6 h-6 bg-white hover:bg-white flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => handleKeyPress(key)}
            className="w-6 h-6 bg-white text-lg font-semibold text-black"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};


const ActionButton = ({ onClick, disabled, loading, children, variant = 'primary' }) => {
  const baseClasses = "w-full py-1 rounded-full font-semibold text-lg transition-all duration-200 disabled:opacity-50";

  const variants = {
    primary: "bg-brand hover:bg-brand text-white disabled:hover:bg-brand",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:hover:bg-gray-200"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
          Verifying...
        </div>
      ) : (
        children
      )}
    </button>
  );
};


const Header = ({ onBack, title }) => {
  return (
    <div className="flex items-center justify-between mb-8 px-6 pt-6">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <span className="text-white font-bold text-xl">{title}</span>
      </div>
    </div>
  );
};


const OTPForm = ({ onSubmit }:{onSubmit:(code: string) => Promise<void>}) => {
  const [timer, setTimer] = useState(59);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      setCode(prev => prev.slice(0, -1));
    } else if (code.length < 4) {
      setCode(prev => prev + key);
    }
  };

  const handleProceed = async () => {
    if (code.length !== 4) return;
    onSubmit(code)
    navigate('auth/auth-flow-complete');
    
  };

  const handleSendAgain = () => {
    setTimer(59);
    setCode('');
    setError('');
  };

  const handleTimerExpire = () => {
    console.log("expired")

  };

  return (
    <>
      {/* <div className="relative border border-red-500  flex-1 flex items-center  h-screen justify-center px-6 lg:px-12 z-50"> */}

      {/* <div className="flex flex-2 items-center justify-center border border-red-500 w-screen h-screen"> */}

      <div className="bg-white lg:max-w-md md:max-w-sm sm:max-w-xs  rounded-3xl lg:px-10 pt-5 md:pb-10 shadow-xl">

        <div className="text-center mb-6">
          <CountdownTimer initialTime={timer} onExpire={handleTimerExpire} />
          <p className="text-gray-600 text-sm leading-relaxed">
            Type the verification code<br />
            sent you to your email
          </p>
        </div>
        <div className="mb-8 text-center">
          <p className="text-gray-500 text-xs">
            This code will expire in <span className="font-semibold">1 minutes</span>
          </p>
        </div>
        <CodeInput
          value={code}
          onChange={setCode}
        />

        <Keypad onKeyPress={handleKeyPress} />

        <div className='lg:px-12 md:px-8'>
        <ActionButton
          onClick={handleProceed}
          disabled={code.length !== 4}
          loading={loading}
        >
          Proceed
        </ActionButton>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-500 text-sm">Didn't get code? </span>
          <button
            onClick={handleSendAgain}
            className="text-brand text-sm font-medium hover:text-brand transition-colors"
          >
            Send again
          </button>
        </div>
      </div>

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default OTPForm;
