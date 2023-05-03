import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { BiMicrophone } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';

const isListening = `mr-4 flex justify-center items-center w-9 h-9 bg-[#ff4c29] rounded-full slide-out`;
const notListening = `mr-5 flex justify-center items-center background-none`;

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  const [onMicClick, setOnMicClick] = useState(false);
  // const [voiceTxt, setVoiceTxt] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const navigate = useNavigate();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support speech recognition.");
  }
  if (!user) {
    // if there is no user then it returns null
    return null;
  }

  setSearchTerm(transcript);

  const listen = () => {
    SpeechRecognition.startListening();
    setOnMicClick(true);
    navigate('/search');
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 5000);
  };
  const notListen = () => {
    resetTranscript();
    setOnMicClick(false);
  };

  return (
    <div className="flex gap-2 md:gap-4 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-xl bg-white border-none outline-none focus-within:shadow-xl">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => {
            navigate('/search');
          }}
          className="p-2 w-full bg-white outline-none"
        />
        {/* Voice Search button */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className={listening ? isListening : notListening}
            onClick={listen}
          >
            {console.log(searchTerm)}
            <BiMicrophone fontSize={21} />
          </button>
          {onMicClick && (
            <button type="button" onClick={notListen}>
              <GrFormClose fontSize={25} />
            </button>
          )}
        </div>
        {console.log(transcript)}
        {/* {setSearchTerm(transcript)} */}
      </div>
      <div className="flex gap-3">
        <Link
          to="create-pin"
          className="bg-[#ff4c29] text-white rounded-lg w-12 h-12  flex justify-center items-center "
        >
          <IoMdAdd fontSize={20} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
