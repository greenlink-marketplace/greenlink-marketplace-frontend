import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignInIcon, SignOutIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

interface Props {
  isVisitor: boolean;
  searchTerm: string;
  setSearchTerm: (newTerm: string) => any;
}

export default function SearchBar({
  isVisitor,
  searchTerm,
  setSearchTerm
}: Props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(searchTerm)

  if (!auth) return null;

  const { cleanCredentials } = auth;

  const handleClick = () => {
    if (isVisitor)
      navigate("/login/");
    else
      cleanCredentials();
  };

  useEffect(() => {
    setCurrentSearchTerm(searchTerm)
  }, [searchTerm])

  return (
    <div className="flex justify-between items-center mb-4 px-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full p-2 border rounded-md bg-white shadow"
          value={currentSearchTerm}
          onChange={(e) => setCurrentSearchTerm(e.target.value)}
        />

        <button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => {
            if (searchTerm != currentSearchTerm)
              setSearchTerm(currentSearchTerm)
            else
              setSearchTerm("")
          }}
          disabled={searchTerm == "" && currentSearchTerm == ""}
        >
          {searchTerm == "" || searchTerm != currentSearchTerm && currentSearchTerm != "" ? (
            <MagnifyingGlassIcon
              className={
                `h-5 w-5
                ${currentSearchTerm == ""
                  ? "text-gray-500"
                  : "text-green-300"
                }`}
            />
          ) : (
            <XIcon
              className="h-5 w-5 text-red-700"
            />
          )}
        </button>
      </div>


      <button
        onClick={handleClick}
        className={`ml-3 p-2 rounded-full transition-colors`}
      >
        {isVisitor ? (
          <SignInIcon className="h-14 w-14 text-green-700" />
        ) : (
          <SignOutIcon className="h-14 w-14 text-red-700" />
        )}
      </button>
    </div >
  );
}