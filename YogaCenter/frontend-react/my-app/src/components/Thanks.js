import { useState, useEffect } from 'react';

export default function Thanks() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showPopup]);


  return (
    <div className='thanks-main'>
      {showPopup && (
        <div className="popup-overlay">
            <div className="popup">
                <p>Thank you for choosing and trusting us. Wish you have a nice experience</p>
            </div>
        </div>
      )}
    </div>
  );
}
