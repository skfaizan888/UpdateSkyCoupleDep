import { useEffect } from "react";
import {
  FaShieldAlt,
  FaUserCheck,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TermsCondition = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center px-4 pt-10 pb-20">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
          <h3 className="text-2xl font-semibold text-pink-600 mb-5 flex items-center gap-2">
            <FaShieldAlt className="text-pink-500" />
            Terms & Conditions
          </h3>
          <ul className="space-y-3 text-gray-800 text-justify">
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              Users must provide accurate and honest information in their
              profile.
            </li>
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              Platform is only for individuals genuinely seeking marriage.
            </li>
            <li className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-yellow-500" />
              We do not guarantee matches, conversations, or marriage.
            </li>
            <li className="flex gap-2 items-start">
              <FaShieldAlt className="mt-1 text-blue-400" />
              Users must verify other profiles independently.
            </li>
            <li className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-red-400" />
              Fraudulent or inappropriate behavior may result in suspension.
            </li>
            <li className="flex gap-2 items-start">
              <FaLock className="mt-1 text-gray-500" />
              All data is protected and may be used for service improvement.
            </li>
            <li className="flex gap-2 items-start">
              <FaLock className="mt-1 text-gray-500" />
              We value your privacy. Read our full Privacy Policy.
            </li>
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              You must be 18+ to use this platform.
            </li>
            <li className="flex gap-2 items-start">
              <FaShieldAlt className="mt-1 text-blue-400" />
              We reserve the right to modify or update terms anytime.
            </li>
          </ul>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
          <h3 className="text-2xl font-semibold text-pink-600 mb-5 flex items-center gap-2">
            <FaShieldAlt className="text-pink-500" />
            अटी व शर्ती
          </h3>
          <ul className="space-y-3 text-gray-800 text-justify leading-relaxed">
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              वापरकर्त्यांनी त्यांच्या प्रोफाइलमध्ये अचूक व प्रामाणिक माहिती
              द्यावी.
            </li>
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              हे व्यासपीठ फक्त विवाह इच्छुकांसाठी आहे.
            </li>
            <li className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-yellow-500" />
              जुळणी, संभाषण किंवा विवाहाची हमी दिली जात नाही.
            </li>
            <li className="flex gap-2 items-start">
              <FaShieldAlt className="mt-1 text-blue-400" />
              प्रत्येकाने इतर प्रोफाइलची खात्री स्वतः करावी.
            </li>
            <li className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-red-400" />
              फसवणूक किंवा गैरवर्तन आढळल्यास खाते बंद केले जाईल.
            </li>
            <li className="flex gap-2 items-start">
              <FaLock className="mt-1 text-gray-500" />
              सेवा सुधारण्यासाठी तुमची माहिती वापरली जाऊ शकते.
            </li>
            <li className="flex gap-2 items-start">
              <FaLock className="mt-1 text-gray-500" />
              तुमच्या गोपनीयतेचा आम्ही आदर करतो.
            </li>
            <li className="flex gap-2 items-start">
              <FaUserCheck className="mt-1 text-pink-400" />
              या प्लॅटफॉर्मवर नोंदणीसाठी तुमचे वय किमान १८ वर्षे असावे.
            </li>
            <li className="flex gap-2 items-start">
              <FaShieldAlt className="mt-1 text-blue-400" />
              अटी वेळोवेळी अद्ययावत केल्या जाऊ शकतात.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
